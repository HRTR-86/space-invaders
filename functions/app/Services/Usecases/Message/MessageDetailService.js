const MessageDetailOutput = require('../../../UseCases/Message/MessageDetailOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageDetailService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageDetailInput} input
     * @return {Promise<MessageDetailOutput>}
     */
    async handle(input) {
        const trnMessage = await this.findMessage(input);

        return new MessageDetailOutput(trnMessage);
    }

    /**
     * メッセージを取得する
     *
     * @param {MessageDetailInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }
};
