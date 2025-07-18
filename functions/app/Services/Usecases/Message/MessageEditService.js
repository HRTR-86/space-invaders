const MessageEditOutput = require('../../../UseCases/Message/MessageEditOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageEditService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageEditInput} input
     * @return {Promise<MessageEditOutput>}
     */
    async handle(input) {
        const trnMessage = await this.editMessage(input);

        return new MessageEditOutput(trnMessage);
    }

    /**
     * メッセージを編集する
     *
     * @param {MessageEditInput} input
     * @return {Promise<TrnMessage>}
     */
    async editMessage(input) {
        const trnMessage = await this.findMessage(input);

        trnMessage.text = input.text;
        trnMessage.is_edited = true;
        trnMessage.updated_by = input.userId;

        const childNodePath = `${input.channelId}/${input.messageId}`;

        return await this.trnMessageRepository.save(trnMessage, childNodePath);
    }

    /**
     * メッセージを取得する
     *
     * @param {MessageEditInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }
};
