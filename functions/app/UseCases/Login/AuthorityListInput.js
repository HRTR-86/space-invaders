const BaseInput = require('../BaseInput');

module.exports = class AuthorityListInput extends BaseInput {
    roleId = 0;

    constructor(args) {
        super();

        this.roleId = this.getParameterToInteger(args, 'role_id');
    }
};
