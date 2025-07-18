const BaseInput = require('../BaseInput');

module.exports = class MessageAddInput extends BaseInput {
    channelId = '';

    text = '';

    coordinatesX = 0;

    coordinatesY = 0;

    userId = '';

    attachedFile = null;

    constructor(args) {
        super();

        this.channelId = this.getParameterToString(args, 'channel_id');
        this.text = this.getParameterToString(args, 'text');
        this.coordinatesX = this.getParameterToInteger(args, 'coordinates_x');
        this.coordinatesY = this.getParameterToInteger(args, 'coordinates_y');
        this.userId = this.getParameterToString(args, 'user_id');
        this.attachedFile = Object.hasOwn(args, 'attached_file') ? args['attached_file'] : null;
    }
};
