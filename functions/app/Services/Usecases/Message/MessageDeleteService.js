const MessageDeleteOutput = require('../../../UseCases/Message/MessageDeleteOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageDeleteService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageDeleteInput} input
     * @return {Promise<MessageDeleteOutput>}
     */
    async handle(input) {
        const trnMessage = await this.deleteMessage(input);

        return new MessageDeleteOutput(trnMessage);
    }

    /**
     * メッセージを削除する
     *
     * @param {MessageDeleteInput} input
     * @return {Promise<TrnMessage>}
     */
    async deleteMessage(input) {
        const trnMessage = await this.findMessage(input);

        trnMessage.updated_by = input.userId;

        const childNodePath = `${input.channelId}/${input.messageId}`;

        return await this.trnMessageRepository.softDelete(
            trnMessage,
            childNodePath,
        );
    }

    /**
     * メッセージを取得する
     *
     * @param {MessageDeleteInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }
};
