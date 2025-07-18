const BaseInput = require('../BaseInput');

module.exports = class ReplyListInput extends BaseInput {
    messageId = '';

    constructor(args) {
        super();

        this.messageId = this.getParameterToString(args, 'message_id');
    }
};
