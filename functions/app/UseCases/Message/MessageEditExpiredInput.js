const BaseInput = require('../BaseInput');

module.exports = class MessageEditExpiredInput extends BaseInput {
    channelId = '';

    messageId = '';

    userId = '';

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
        this.messageId = this.getParameterToString(args, 'message_id');
        this.userId = this.getParameterToString(args, 'user_id');
    }
};
