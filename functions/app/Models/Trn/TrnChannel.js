const Model = require('../../Database/Model');

module.exports = class TrnChannel extends Model {
    table = 'trn_channel';

    fillable = [
        'name',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    attributes = {
        name: '',
        updated_by: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    };

    casts = {
        name: 'string',
        updated_by: 'string',
        created_at: 'string',
        updated_at: 'string',
        deleted_at: 'string',
    };

    constructor() {
        super();
    }
};
