const BaseInput = require('../BaseInput');

module.exports = class UserDetailInput extends BaseInput {
    userId = '';

    constructor(args) {
        super();

        this.userId = this.getParameterToString(args, 'user_id');
    }
};
