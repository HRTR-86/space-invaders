const ChannelUserAddOutput = require('../../../UseCases/ChannelUser/ChannelUserAddOutput');
const TrnChannelRepository = require('../../../Repositories/TrnChannelRepository');
const TrnChannelUserRepository = require('../../../Repositories/TrnChannelUserRepository');
const TrnChannelUser = require('../../../Models/Trn/TrnChannelUser');

module.exports = class ChannelUserAddService {
    constructor() {
        this.trnChannelRepository = new TrnChannelRepository();
        this.trnChannelUserRepository = new TrnChannelUserRepository();
    }

    /**
     * @param {ChannelUserAddInput} input
     * @return {Promise<ChannelUserAddOutput>}
     */
    async handle(input) {
        const trnChannel = await this.findChannel(input);
        const trnChannelUser = await this.addChannelUser(
            trnChannel.id,
            input.userId,
        );

        return new ChannelUserAddOutput(trnChannelUser);
    }

    /**
     * チャンネルを取得する
     *
     * @param {ChannelUserAddInput} input
     * @return {Promise<TrnChannel>}
     */
    async findChannel(input) {
        const trnChannel = await this.trnChannelRepository.findById(
            input.channelId,
        );

        if (trnChannel === null) {
            // TODO: Not foundのエラーを出す
        }

        return trnChannel;
    }

    /**
     * チャンネルにユーザを追加する
     *
     * @param {string} channelId
     * @param {string} userId
     * @return {Promise<TrnChannelUser>}
     */
    async addChannelUser(channelId, userId) {
        const trnChannelUser = new TrnChannelUser();

        trnChannelUser.channel_id = channelId;
        trnChannelUser.user_id = userId;

        return await this.trnChannelUserRepository.save(trnChannelUser);
    }
};
