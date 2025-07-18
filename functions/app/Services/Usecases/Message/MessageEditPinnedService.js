const dayjs = require('dayjs');
const MessageEditPinnedOutput = require('../../../UseCases/Message/MessageEditPinnedOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageEditPinnedService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageEditPinnedInput} input
     * @return {Promise<MessageEditPinnedOutput>}
     */
    async handle(input) {
        const trnMessage = await this.editMessage(input);

        return new MessageEditPinnedOutput(trnMessage);
    }

    /**
     * メッセージを編集する
     *
     * @param {MessageEditPinnedInput} input
     * @return {Promise<TrnMessage>}
     */
    async editMessage(input) {
        const trnMessage = await this.findMessage(input);

        trnMessage.is_pinned = !trnMessage.is_pinned;
        trnMessage.limit = this.calculateLimit(trnMessage);
        trnMessage.updated_by = input.userId;

        const childNodePath = `${input.channelId}/${input.messageId}`;

        return await this.trnMessageRepository.save(trnMessage, childNodePath);
    }

    /**
     * メッセージを取得する
     *
     * @param {MessageEditPinnedInput} input
     * @return {Promise<TrnMessage>}
     */
    async findMessage(input) {
        return await this.trnMessageRepository.findByChannelIdAndMessageId(
            input.channelId,
            input.messageId,
        );
    }

    /**
     * 掲載期限を計算する
     *
     * @param {TrnMessage} trnMessage
     * @return {string}
     */
    calculateLimit(trnMessage) {
        if (trnMessage.is_pinned) {
            return trnMessage.limit;
        }

        // ピン留めを外した場合
        const postedTime = dayjs();
        const limit = postedTime.add(7, 'day');

        return limit.format('YYYY-MM-DD HH:mm:ss');
    }
};
