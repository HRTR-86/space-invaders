const ChannelDetailOutput = require('../../../UseCases/Channel/ChannelDetailOutput');
const TrnChannelRepository = require('../../../Repositories/TrnChannelRepository');

module.exports = class ChannelDetailService {
    constructor() {
        this.trnChannelRepository = new TrnChannelRepository();
    }

    /**
     * @param {ChannelDetailInput} input
     * @return {Promise<ChannelDetailOutput>}
     */
    async handle(input) {
        const trnChannel = await this.findChannel(input);

        return new ChannelDetailOutput(trnChannel);
    }

    /**
     * チャンネルを取得する
     *
     * @param {ChannelDetailInput} input
     * @return {Promise<TrnChannel>}
     */
    async findChannel(input) {
        return this.trnChannelRepository.findById(input.channelId);
    }
};
