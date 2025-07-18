const BaseInput = require('../BaseInput');

module.exports = class MessageListInput extends BaseInput {
    channelId = '';

    userId = '';

    direction = '';

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
        this.userId = this.getParameterToString(args, 'user_id');
        this.direction = this.getParameterToString(args, 'direction');
    }
};
