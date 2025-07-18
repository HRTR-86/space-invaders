module.exports = class ChannelUserListOutput {
    /**  @type {TrnChannelUser[]} */
    trnChannelUserList = [];

    /**
     * @param {TrnChannelUser[]} trnChannelUserList
     */
    constructor(trnChannelUserList) {
        this.trnChannelUserList = trnChannelUserList;
    }

    async getOutput() {
        return {
            trn_channel_user_list: await Promise.all(
                this.trnChannelUserList.map(async (trnChannelUser) => {
                    const trnChannel = await trnChannelUser.TrnChannel();

                    return {
                        channel_id: trnChannelUser.channel_id,
                        channel_name: trnChannel.name,
                        user_id: trnChannelUser.user_id,
                    };
                }),
            ),
        };
    }
};
