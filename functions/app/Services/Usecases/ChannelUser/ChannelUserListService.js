const ChannelUserOutput = require('../../../UseCases/Channel/ChannelUserListOutput');
const TrnChannelUserRepository = require('../../../Repositories/TrnChannelUserRepository');

module.exports = class ChannelUserListService {
    constructor() {
        this.trnChannelUserRepository = new TrnChannelUserRepository();
    }

    /**
     * @param {ChannelUserListInput} input
     * @return {Promise<ChannelUserOutput>}
     */
    async handle(input) {
        const trnChannelUserList = await this.list(input);

        return new ChannelUserOutput(trnChannelUserList);
    }

    /**
     * 一覧を取得する
     *
     * @param {ChannelUserListInput} input
     * @return {Promise<TrnChannelUser[]>}
     */
    async list(input) {
        if (input.userId) {
            const trnChannelUserList =
                await this.trnChannelUserRepository.listByUserId(input.userId);

            if (input.channelId) {
                return trnChannelUserList.filter((trnChannelUser) => {
                    return trnChannelUser.channel_id === input.channelId;
                });
            }

            return trnChannelUserList;
        }

        return await this.trnChannelUserRepository.listByChannelId(
            input.channelId,
        );
    }
};
