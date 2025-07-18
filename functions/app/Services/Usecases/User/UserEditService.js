const UserEditOutput = require('../../../UseCases/User/UserEditOutput');
const TrnUserRepository = require('../../../Repositories/TrnUserRepository');

module.exports = class UserEditService {
    constructor() {
        this.trnUserRepository = new TrnUserRepository();
    }

    /**
     * @param {UserEditInput} input
     * @return {Promise<UserEditOutput>}
     */
    async handle(input) {
        const trnUser = await this.editUser(input);

        return new UserEditOutput(trnUser);
    }

    /**
     * ユーザを編集する
     *
     * @param {UserEditInput} input
     * @return {Promise<TrnUser>}
     */
    async editUser(input) {
        const trnUser = await this.trnUserRepository.findById(
          input.userId,
        );

        if (trnUser === null) {
            // TODO: Not foundのエラーを出す
        }

        trnUser.name = input.name;

        return await this.trnUserRepository.save(trnUser, input.userId);
    }
};
