const TrnChannel = require('../Models/Trn/TrnChannel');

module.exports = class TrnChannelRepository {
    /**
     * idを指定して取得する
     *
     * @param {string} channelId
     * @return {Promise<TrnChannel|null>}
     */
    async findById(channelId) {
        const trnChannel = new TrnChannel();
        const childNodePath = `${channelId}`;

        return await trnChannel.find(childNodePath);
    }

    /**
     * @param {TrnChannel} trnChannel
     * @param {string} childNodePath
     * @return {Promise<TrnChannel>}
     */
    async save(trnChannel, childNodePath = '') {
        return await trnChannel.save(childNodePath);
    }
};
