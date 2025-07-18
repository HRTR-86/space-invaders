module.exports = class ChannelUserAddOutput {
    trnChannelUser = {};

    /**
     * @param {TrnChannelUser} trnChannelUser
     */
    constructor(trnChannelUser) {
        this.trnChannelUser = trnChannelUser;
    }

    getOutput() {
        return {
            id: this.trnChannelUser.id,
            channel_id: this.trnChannelUser.channel_id,
        };
    }
};
