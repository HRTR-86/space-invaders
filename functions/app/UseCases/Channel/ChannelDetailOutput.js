module.exports = class ChannelDetailOutput {
    trnChannel = {};

    /**
     * @param {TrnChannel} trnChannel
     */
    constructor(trnChannel) {
        this.trnChannel = trnChannel;
    }

    getOutput() {
        return {
            trn_channel: {
                id: this.trnChannel.id,
                name: this.trnChannel.name,
            },
        };
    }
};
