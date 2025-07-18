const BaseInput = require('../BaseInput');

module.exports = class ChannelDetailInput extends BaseInput {
    channelId = '';

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
    }
};
