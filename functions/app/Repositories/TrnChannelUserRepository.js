const TrnChannelUser = require('../Models/Trn/TrnChannelUser');
module.exports = class TrnChannelUserRepository {
    /**
     * channel_idを指定して一覧を取得する
     *
     * @param {string} channelId
     * @return {Promise<TrnChannelUser[]>}
     */
    async listByChannelId(channelId) {
        const trnChannelUser = new TrnChannelUser();

        return await trnChannelUser.get('', 'channel_id', channelId);
    }

    /**
     * user_idを指定して一覧を取得する
     *
     * @param {string} userId
     * @return {Promise<TrnChannelUser[]>}
     */
    async listByUserId(userId) {
        const trnChannelUser = new TrnChannelUser();

        return await trnChannelUser.get('', 'user_id', userId);
    }

    /**
     * @param {TrnChannelUser} trnChannelUser
     * @param {string} childNodePath
     * @return {Promise<TrnChannelUser>}
     */
    async save(trnChannelUser, childNodePath = '') {
        return await trnChannelUser.save(childNodePath);
    }
};
