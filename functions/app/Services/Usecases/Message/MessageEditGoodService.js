const MessageEditGoodOutput = require('../../../UseCases/Message/MessageEditGoodOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageEditGoodService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageEditGoodInput} input
     * @return {Promise<MessageEditGoodOutput>}
     */
    async handle(input) {
        const trnMessage = await this.editMessage(input);

        return new MessageEditGoodOutput(trnMessage);
    }

    /**
     * メッセージを編集する
     *
     * @param {MessageEditGoodInput} input
     * @return {Promise<TrnMessage>}
     */
    async editMessage(input) {
        const trnMessage = await this.findMessage(input);

        if (Object.hasOwn(trnMessage.good, input.userId)) {
            delete trnMessage.good[input.userId];
        } else {
            trnMessage.good = {
                ...trnMessage.good,
                [input.userId]: '',
            };
        }

        trnMessage.updated_by = input.userId;

        const childNodePath = `${input.channelId}/${input.messageId}`;

        return await this.trnMessageRepository.save(trnMessage, childNodePath);
    }

    /**
     * メッセージを取得する
     *
     * @param {MessageEditGoodInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }
};
