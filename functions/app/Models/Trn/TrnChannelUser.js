const Model = require('../../Database/Model');
const TrnChannel = require('./TrnChannel');

module.exports = class TrnChannelUser extends Model {
    table = 'trn_channel_user';

    fillable = [
        'channel_id',
        'user_id',
    ];

    attributes = {
        channel_id: '',
        user_id: '',
    };

    casts = {
        channel_id: 'string',
        user_id: 'string',
    };

    constructor() {
        super();
    }

    /**
     * @returns {Promise<TrnChannel|null>}
     */
    async TrnChannel() {
        const trnChannel = new TrnChannel();

        return await trnChannel.find(this.channel_id);
    }
};
