const LoginOutput = require('../../../UseCases/Login/LoginOutput');
const TrnUserRepository = require('../../../Repositories/TrnUserRepository');

module.exports = class LoginService {
    constructor() {
        this.trnUserRepository = new TrnUserRepository();
    }

    /**
     * @param {LoginInput} input
     * @return {Promise<LoginOutput>}
     */
    async handle(input) {
        const trnUser = await this.findUser(input);

        return new LoginOutput(trnUser);
    }

    /**
     * ユーザー情報を取得する
     *
     * @param {LoginInput} input
     * @return {Promise<TrnUser|null>}
     */
    async findUser(input) {
        const trnUser = await this.trnUserRepository.findByUuid(input.uuid);

        if (trnUser === null) {
            return null;
        }

        if (input.photoUrl !== trnUser.photo_url) {
            trnUser.photo_url = input.photoUrl;
            await this.trnUserRepository.save(trnUser, input.uuid);
        }

        return trnUser;
    }
};
