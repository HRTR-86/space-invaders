const BaseInput = require('../BaseInput');

module.exports = class ChannelUserListInput extends BaseInput {
    channelId = '';

    userId = '';

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
        this.userId = this.getParameterToString(args, 'user_id');
    }
};
