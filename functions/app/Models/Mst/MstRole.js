const Model = require('../../Database/Model');

module.exports = class MstRole extends Model {
    table = 'mst_role';

    fillable = [
        'name',
        'authority',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    attributes = {
        name: '',
        authority: {},
        updated_by: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    };

    casts = {
        name: 'string',
        authority: 'object',
        updated_by: 'string',
        created_at: 'string',
        updated_at: 'string',
        deleted_at: 'string',
    };

    constructor() {
        super();
    }
};
