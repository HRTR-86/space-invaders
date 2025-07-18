const ChannelAddOutput = require('../../../UseCases/Channel/ChannelAddOutput');
const TrnChannelRepository = require('../../../Repositories/TrnChannelRepository');
const TrnChannelUserRepository = require('../../../Repositories/TrnChannelUserRepository');
const TrnChannel = require('../../../Models/Trn/TrnChannel');
const TrnChannelUser = require('../../../Models/Trn/TrnChannelUser');

module.exports = class ChannelAddService {
    constructor() {
        this.trnChannelRepository = new TrnChannelRepository();
        this.trnChannelUserRepository = new TrnChannelUserRepository();
    }

    /**
     * @param {ChannelAddInput} input
     * @return {Promise<ChannelAddOutput>}
     */
    async handle(input) {
        const trnChannel = await this.addChannel(input);
        await this.addChannelUser(trnChannel.id, input.userId);

        return new ChannelAddOutput(trnChannel);
    }

    /**
     * チャンネルを追加する
     *
     * @param {ChannelAddInput} input
     * @return {Promise<TrnChannel>}
     */
    async addChannel(input) {
        const trnChannel = new TrnChannel();

        trnChannel.name = input.channelName;
        trnChannel.updated_by = input.userId;

        return await this.trnChannelRepository.save(trnChannel);
    }

    /**
     * チャンネルにユーザを追加する
     *
     * @param {string} channelId
     * @param {string} userId
     * @return {Promise<void>}
     */
    async addChannelUser(channelId, userId) {
        if (userId === '') {
            return;
        }

        const trnChannelUser = new TrnChannelUser();

        trnChannelUser.channel_id = channelId;
        trnChannelUser.user_id = userId;

        await this.trnChannelUserRepository.save(trnChannelUser);
    }
};
