const BaseInput = require('../BaseInput');

module.exports = class SignUpInput extends BaseInput {
    name = '';

    uuid = '';

    photoUrl = '';

    constructor(args) {
        super();

        this.name = this.getParameterToString(args, 'name');
        this.uuid = this.getParameterToString(args, 'uuid');
        this.photoUrl = this.getParameterToString(args, 'photo_url');
    }
};
