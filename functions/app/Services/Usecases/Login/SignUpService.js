const SignUpOutput = require('../../../UseCases/Login/SignUpOutput');
const TrnUserRepository = require('../../../Repositories/TrnUserRepository');
const TrnUser = require('../../../Models/Trn/TrnUser');
const { Role } = require('../../../Enum/Role');

module.exports = class SignUpService {
    constructor() {
        this.trnUserRepository = new TrnUserRepository();
    }

    /**
     * @param {SignUpInput} input
     * @return {Promise<SignUpOutput>}
     */
    async handle(input) {
        const trnUser = await this.addUser(input);

        return new SignUpOutput(trnUser);
    }

    /**
     * ユーザーを登録する
     *
     * @param {SignUpInput} input
     * @return {Promise<TrnUser>}
     */
    async addUser(input) {
        const trnUser = new TrnUser();

        trnUser.name = input.name;
        trnUser.uuid = input.uuid;
        trnUser.photo_url = input.photoUrl;
        trnUser.role_id = Role.GENERAL;
        trnUser.is_suspension = false;

        return await this.trnUserRepository.save(trnUser);
    }
};
