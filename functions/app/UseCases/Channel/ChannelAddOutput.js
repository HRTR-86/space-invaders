module.exports = class ChannelAddOutput {
    trnChannel = {};

    /**
     * @param {TrnChannel} trnChannel
     */
    constructor(trnChannel) {
        this.trnChannel = trnChannel;
    }

    getOutput() {
        return {
            id: this.trnChannel.id,
        };
    }
};
