const Validator = require('validatorjs');
const { StatusCode } = require('../../../Enum/StatusCode');

module.exports = async (request, response, next) => {
    const validator = validate(request.query);

    if (validator.fails(undefined)) {
        return response
            .status(StatusCode.UNPROCESSABLE_ENTITY)
            .json(validator.errors.all());
    }

    next();
};

/**
 * バリデーションのルールを取得する.
 * @return Object
 */
function getRules() {
    return {
        channel_id: 'string',
        user_id: 'string',
        direction: 'string',
    };
}

/**
 * バリデーションを行う.
 * @return Validator
 */
function validate(args) {
    const rules = getRules();

    return new Validator(args, rules);
}
