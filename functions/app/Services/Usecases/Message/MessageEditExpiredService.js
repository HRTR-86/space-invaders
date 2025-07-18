const MessageEditExpiredOutput = require('../../../UseCases/Message/MessageEditExpiredOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageEditExpiredService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageEditExpiredInput} input
     * @return {Promise<MessageEditExpiredOutput>}
     */
    async handle(input) {
        const trnMessage = await this.editMessage(input);

        return new MessageEditExpiredOutput(trnMessage);
    }

    /**
     * メッセージを編集する
     *
     * @param {MessageEditExpiredInput} input
     * @return {Promise<TrnMessage>}
     */
    async editMessage(input) {
        const trnMessage = await this.findMessage(input);

        trnMessage.is_expired = true;
        trnMessage.updated_by = input.userId;

        const childNodePath = `${input.channelId}/${input.messageId}`;

        return await this.trnMessageRepository.save(trnMessage, childNodePath);
    }

    /**
     * メッセージを取得する
     *
     * @param {MessageEditExpiredInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }
};
