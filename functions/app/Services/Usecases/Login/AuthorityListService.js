const AuthorityListOutput = require('../../../UseCases/Login/AuthorityListOutput');
const MstRoleRepository = require('../../../Repositories/MstRoleRepository');

module.exports = class AuthorityListService {
    constructor() {
        this.mstRoleRepository = new MstRoleRepository();
    }

    /**
     * @param {AuthorityListInput} input
     * @return {Promise<AuthorityListOutput>}
     */
    async handle(input) {
        const mstRole = await this.findRole(input);

        return new AuthorityListOutput(mstRole);
    }

    /**
     * ロールを取得する
     *
     * @param {AuthorityListInput} input
     * @return {Promise<MstRole|null>}
     */
    async findRole(input) {
        return await this.mstRoleRepository.findByRoleId(input.roleId);
    }
};
