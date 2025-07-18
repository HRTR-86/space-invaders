const ReplyListOutput = require('../../../UseCases/Reply/ReplyListOutput');
const TrnReplyRepository = require('../../../Repositories/TrnReplyRepository');

module.exports = class ReplyListService {
    constructor() {
        this.trnReplyRepository = new TrnReplyRepository();
    }

    /**
     * @param {ReplyListInput} input
     * @return {Promise<ReplyListOutput>}
     */
    async handle(input) {
        const trnReplyListList = await this.list(input);

        return new ReplyListOutput(trnReplyListList);
    }

    /**
     * 一覧を取得する
     *
     * @param {ReplyListInput} input
     * @return {Promise<TrnReply[]>}
     */
    async list(input) {
        return await this.trnReplyRepository.listByMessageId(input.messageId);
    }
};
