const BaseInput = require('../BaseInput');

module.exports = class LoginInput extends BaseInput {
    uuid = '';

    photoUrl = '';

    constructor(args) {
        super();

        this.uuid = this.getParameterToString(args, 'uuid');
        this.photoUrl = this.getParameterToString(args, 'photo_url');
    }
};
