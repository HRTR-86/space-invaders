const UserDetailOutput = require('../../../UseCases/User/UserDetailOutput');
const TrnUserRepository = require('../../../Repositories/TrnUserRepository');

module.exports = class UserDetailService {
    constructor() {
        this.trnUserRepository = new TrnUserRepository();
    }

    /**
     * @param {UserDetailInput} input
     * @return {Promise<UserDetailOutput>}
     */
    async handle(input) {
        const trnUser = await this.findUser(input);

        return new UserDetailOutput(trnUser);
    }

    /**
     * ユーザーを取得する
     *
     * @param {UserDetailInput} input
     * @return {Promise<TrnUser>}
     */
    async findUser(input) {
        return await this.trnUserRepository.findById(input.userId);
    }
};
