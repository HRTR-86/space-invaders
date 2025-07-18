const admin = require('firebase-admin');
const dayjs = require('dayjs');
const database = admin.database();

module.exports = class QueryBuilder {
    // 操作対象のモデル
    model = null;

    /**
     * モデルをセットする
     *
     * @param model
     * @return {void}
     */
    setModel(model) {
        this.model = model;
    }

    /**
     * 条件に一致するデータを取得する
     *
     * @param {string} childNodePath
     * @return {Promise}
     */
    async find(childNodePath) {
        const query = database.ref(`/${this.model.table}/${childNodePath}`);
        const result = await query.once('value');

        if (!result.exists()) {
            return null;
        }

        return this.model.getNewInstance({
            id: result.key,
            ...result.val(),
        });
    }

    /**
     * 条件に一致するデータの一覧を取得する
     *
     * @param {string} childNodePath
     * @param {string} column
     * @param {string|number} value
     * @return Promise
     */
    async get(childNodePath, column, value) {
        const query = database.ref(`/${this.model.table}/${childNodePath}`);
        const result = await query
            .orderByChild(column)
            .equalTo(value)
            .once('value');
        const data = result.val();

        return Object.keys(data ?? {})
            .filter((key) => {
                if (Object.hasOwn(data[key], 'deleted_at')) {
                    return !data[key].deleted_at;
                } else {
                    return true;
                }
            })
            .map((key) => {
                return this.model.getNewInstance({
                    id: key,
                    ...data[key],
                });
            });
    }

    /**
     * データを追加・保存する
     *
     * @param {string} childNodePath
     * @return Promise
     */
    async save(childNodePath = '') {
        const attributes = this.model.getAttributes();

        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

        if (Object.hasOwn(attributes, 'updated_at')) {
            attributes.updated_at = now;
        }

        if (
            Object.hasOwn(attributes, 'created_at') &&
            this.model.exists === false
        ) {
            attributes.created_at = now;
        }

        if (this.model.exists) {
            return await this.update(
                `/${this.model.table}/${childNodePath}`,
                attributes,
            );
        }

        return await this.insert(
            `/${this.model.table}/${childNodePath}`,
            attributes,
        );
    }

    /**
     * データを追加する
     *
     * @param {string} childNodePath
     * @param {Object|string} attributes
     * @return Promise
     */
    async insert(childNodePath, attributes) {
        const query = database.ref(childNodePath);
        const result = await query.push(attributes);

        return this.model.getNewInstance({
            id: result.key,
            ...attributes,
        });
    }

    /**
     * データを更新する
     *
     * @param {string} childNodePath
     * @param {Object|string} attributes
     * @return Promise
     */
    async update(childNodePath, attributes) {
        const query = database.ref(childNodePath);
        await query.set(attributes);

        return this.model.getNewInstance({
            id: query.key,
            ...attributes,
        });
    }

    /**
     * データを論理削除する
     *
     * @param {string} childNodePath
     * @return Promise
     */
    async delete(childNodePath = '') {
        const attributes = this.model.getAttributes();
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

        if (Object.hasOwn(attributes, 'updated_at')) {
            attributes.updated_at = now;
        }

        attributes.deleted_at = now;

        return await this.update(
            `/${this.model.table}/${childNodePath}`,
            attributes,
        );
    }
};
