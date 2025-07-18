const TrnReply = require('../Models/Trn/TrnReply');

module.exports = class TrnReplyRepository {
    /**
     * message_idを指定して返信一覧を取得する
     *
     * @param {string} messageId
     * @return {Promise<TrnReply[]>}
     */
    async listByMessageId(messageId) {
        const trnReply = new TrnReply();

        return await trnReply.get('', 'message_id', messageId);
    }

    /**
     * @param {TrnReply} trnReply
     * @param {string} childNodePath
     * @return {Promise<TrnReply>}
     */
    async save(trnReply, childNodePath = '') {
        return await trnReply.save(childNodePath);
    }
};
