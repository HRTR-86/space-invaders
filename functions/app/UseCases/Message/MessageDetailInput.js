const BaseInput = require('../BaseInput');

module.exports = class MessageDetailInput extends BaseInput {
    channelId = '';

    messageId = '';

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
        this.messageId = this.getParameterToString(args, 'message_id');
    }
};
