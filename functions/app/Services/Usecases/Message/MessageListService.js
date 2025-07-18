const MessageListOutput = require('../../../UseCases/Message/MessageListOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');

module.exports = class MessageListService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
    }

    /**
     * @param {MessageListInput} input
     * @return {Promise<MessageListOutput>}
     */
    async handle(input) {
        const trnMessageListList = await this.list(input);

        return new MessageListOutput(trnMessageListList);
    }

    /**
     * 一覧を取得する
     *
     * @param {MessageListInput} input
     * @return {Promise<TrnMessage[]>}
     */
    async list(input) {
        return await this.trnMessageRepository.listByUserId(
          input.channelId,
          input.userId,
          input.direction,
        );
    }
};
