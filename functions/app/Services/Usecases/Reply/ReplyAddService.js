const ReplyAddOutput = require('../../../UseCases/Reply/ReplyAddOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');
const TrnReplyRepository = require('../../../Repositories/TrnReplyRepository');
const TrnReply = require('../../../Models/Trn/TrnReply');

module.exports = class ReplyAddService {
    constructor() {
        this.trnReplyRepository = new TrnReplyRepository();
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {ReplyAddInput} input
     * @return {Promise<ReplyAddOutput>}
     */
    async handle(input) {
        const trnReply = await this.addReply(input);
        await this.editMessage(input, trnReply);

        return new ReplyAddOutput(trnReply);
    }

    /**
     * 返信を追加する
     *
     * @param {ReplyAddInput} input
     * @return {Promise<TrnReply>}
     */
    async addReply(input) {
        const trnReply = new TrnReply();

        trnReply.text = input.text;
        trnReply.message_id = input.messageId;
        trnReply.created_by = input.userId;
        trnReply.updated_by = input.userId;

        return await this.trnReplyRepository.save(trnReply);
    }

    /**
     * メッセージを更新する
     *
     * @param {ReplyAddInput} input
     * @param {TrnReply} trnReply
     * @return {Promise<void>}
     */
    async editMessage(input, trnReply) {
        const trnMessage = await this.findMessage(input);

        trnMessage.reply_id_list = {
            ...trnMessage.reply_id_list,
            [trnReply.id]: '',
        };

        const childNodePath = `${input.channelId}/${input.messageId}`;

        return await this.trnMessageRepository.save(
          trnMessage,
          childNodePath,
        );
    }

    /**
     * メッセージを取得する
     *
     * @param {ReplyAddInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }
};
