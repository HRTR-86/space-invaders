const QueryBuilder = require('./QueryBuilder');

module.exports = class Model extends QueryBuilder {
    // テーブル名
    table = '';

    // 主キー
    id = '';

    // 値の設定が可能なカラムの一覧
    fillable = [];

    // カラムの初期値
    attributes = {};

    // カラムの型
    casts = {};

    // モデルが存在するか
    exists = false;

    constructor() {
        super();

        this.setModel(this);
        this.fill();
    }

    /**
     * 値の設定が可能なカラムか
     *
     * @param {string} key
     * @param {object} attributes
     */
    isFillable(key, attributes) {
        return (
            attributes.hasOwnProperty(key) &&
            this.isCastable(key, attributes[key])
        );
    }

    /**
     * 指定されたカラムの型か
     *
     * @param {string} key
     * @param value
     */
    isCastable(key, value) {
        return true;
        // return typeof this.casts[key] === typeof value;
    }

    /**
     * カラムに設定された値の一覧を取得する
     *
     * @return {Object}
     */
    getAttributes() {
        this.fillable.forEach((key) => {
            if (this[key] === undefined) {
                return;
            }
            this.attributes[key] = this[key];
        });

        return this.attributes;
    }

    /**
     * カラムに値を設定する
     *
     * @param {Object} attributes
     * @returns {Model}
     */
    fill(attributes = {}) {
        if (attributes === null) {
            return null;
        }

        if (Object.hasOwn(attributes, 'id')) {
            this.id = attributes.id;
        }

        this.fillable.forEach((key) => {
            if (this.isFillable(key, attributes)) {
                this[key] = attributes[key];
            } else {
                this[key] = this.attributes[key];
            }
        });

        return this;
    }

    /**
     * 新しいインスタンスを取得する
     *
     * @param {Object} attributes
     * @returns {Model}
     */
    getNewInstance(attributes = {}) {
        const instance = new this.constructor();

        instance.fill(attributes);
        instance.exists = Object.keys(attributes).length > 0;

        return instance;
    }
};
