const TrnMessage = require('../Models/Trn/TrnMessage');

module.exports = class TrnMessageRepository {
    /**
     * channel_id, message_idを指定してメッセージを取得する
     *
     * @param {string} channelId
     * @param {string} messageId
     * @return {Promise<TrnMessage|null>}
     */
    async findByChannelIdAndMessageId(channelId, messageId) {
        const trnMessage = new TrnMessage();
        const childNodePath = `${channelId}/${messageId}`;

        return await trnMessage.find(childNodePath);
    }

    /**
     * created_byを指定してメッセージ一覧を取得する
     *
     * @param {string} channelId
     * @param {string} posterId
     * @param {string} direction
     * @returns {Promise<TrnMessage[]>}
     */
    async listByUserId(channelId, posterId, direction) {
        const trnMessage = new TrnMessage();
        const childNodePath = `${channelId}`;

        const trnMessageList = await trnMessage.get(
          childNodePath,
          'created_by',
          posterId,
        );

        if (direction === 'desc') {
            trnMessageList.reverse();
        }

        return trnMessageList;
    }

    /**
     * @param {TrnMessage} trnMessage
     * @param {string} childNodePath
     * @return {Promise<TrnMessage>}
     */
    async save(trnMessage, childNodePath = '') {
        return await trnMessage.save(childNodePath);
    }

    /**
     * メッセージを論理削除する
     *
     * @param {TrnMessage} trnMessage
     * @param {string} childNodePath
     * @return {Promise<TrnMessage>}
     */
    async softDelete(trnMessage, childNodePath = '') {
        return await trnMessage.delete(childNodePath);
    }
};
