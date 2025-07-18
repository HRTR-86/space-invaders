const BaseInput = require('../BaseInput');

module.exports = class UserEditInput extends BaseInput {
    userId = '';

    name = '';

    constructor(args) {
        super();

        this.userId = this.getParameterToString(args, 'user_id');
        this.name = this.getParameterToString(args, 'name');
    }
};
