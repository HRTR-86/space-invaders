const Model = require('../../Database/Model');

module.exports = class TrnUser extends Model {
    table = 'trn_user';

    fillable = [
        'name',
        'uuid',
        'photo_url',
        'role_id',
        'is_suspension',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    attributes = {
        name: '',
        uuid: '',
        photo_url: '',
        role_id: '',
        is_suspension: false,
        updated_by: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    };

    casts = {
        name: 'string',
        uuid: 'string',
        photo_url: 'string',
        is_suspension: 'boolean',
        role_id: 'string',
        updated_by: 'string',
        created_at: 'string',
        updated_at: 'string',
        deleted_at: 'string',
    };

    constructor() {
        super();
    }
};
