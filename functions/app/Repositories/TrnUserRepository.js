const TrnUser = require('../Models/Trn/TrnUser');

module.exports = class TrnUserRepository {
    /**
     * idを指定してユーザーを取得する
     *
     * @param {string} id
     * @return {Promise<TrnUser|null>}
     */
    async findById(id) {
        const trnUser = new TrnUser();

        return await trnUser.find(id);
    }

    /**
     * uuidを指定してユーザーを取得する
     *
     * @param {string} uuid
     * @return {Promise<TrnUser|null>}
     */
    async findByUuid(uuid) {
        const trnUser = new TrnUser();
        const result = await trnUser.get('', 'uuid', uuid);

        return result[0] ?? null;
    }

    /**
     * @param {TrnUser} trnUser
     * @param {string} childNodePath
     * @return {Promise<TrnUser>}
     */
    async save(trnUser, childNodePath = '') {
        return await trnUser.save(childNodePath);
    }
};
