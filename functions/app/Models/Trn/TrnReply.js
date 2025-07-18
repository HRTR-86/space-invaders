const Model = require('../../Database/Model');

module.exports = class TrnReply extends Model {
    table = 'trn_reply';

    fillable = [
        'text',
        'message_id',
        'good',
        'attached_file_path',
        'is_edited',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    attributes = {
        text: '',
        message_id: '',
        good: {
            initialId: '',
        },
        attached_file_path: '',
        is_edited: false,
        created_by: '',
        updated_by: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    };

    casts = {
        text: 'string',
        message_id: 'string',
        is_edited: 'boolean',
        created_by: 'string',
        updated_by: 'string',
        created_at: 'string',
        updated_at: 'string',
        deleted_at: 'string',
    };

    constructor() {
        super();
    }
};
