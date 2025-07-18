const BaseInput = require('../BaseInput');

module.exports = class ChannelAddInput extends BaseInput {
    channelName = '';

    userId = '';

    constructor(args) {
        super();

        this.channelName = this.getParameterToString(args, 'channel_name');
        this.userId = this.getParameterToString(args, 'user_id');
    }
};
