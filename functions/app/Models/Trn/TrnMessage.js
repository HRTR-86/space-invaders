const Model = require('../../Database/Model');
const TrnUser = require('./TrnUser');

module.exports = class TrnMessage extends Model {
    table = 'trn_message';

    fillable = [
        'text',
        'coordinates_x',
        'coordinates_y',
        'good',
        'reply_id_list',
        'limit',
        'attached_file_path',
        'is_edited',
        'is_expired',
        'is_pinned',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    attributes = {
        text: '',
        coordinates_x: 0,
        coordinates_y: 0,
        good: {
            initialId: '',
        },
        reply_id_list: {},
        limit: '',
        attached_file_path: '',
        is_edited: false,
        is_expired: false,
        is_pinned: false,
        created_by: '',
        updated_by: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    };

    casts = {
        text: 'string',
        coordinates_x: 'number',
        coordinates_y: 'number',
        good: 'object',
        limit: 'string',
        is_edited: 'boolean',
        is_expire: 'boolean',
        is_pinned: 'boolean',
        created_by: 'string',
        updated_by: 'string',
        created_at: 'string',
        updated_at: 'string',
        deleted_at: 'string',
    };

    constructor() {
        super();
    }

    /**
     * @returns {Promise<TrnUser|null>}
     */
    async TrnUser() {
        const trnUser = new TrnUser();

        return await trnUser.find(this.created_by);
    }
};
