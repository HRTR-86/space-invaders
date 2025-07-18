const BaseInput = require('../BaseInput');

module.exports = class ReplyAddInput extends BaseInput {
    channelId = '';

    messageId = '';

    text = '';

    userId = '';

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
        this.messageId = this.getParameterToString(args, 'message_id');
        this.text = this.getParameterToString(args, 'text');
        this.userId = this.getParameterToString(args, 'user_id');
    }
};
