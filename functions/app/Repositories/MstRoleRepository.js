const MstRole = require('../Models/Mst/MstRole');

module.exports = class MstRoleRepository {
    /**
     * role_idを指定してロールを取得する
     *
     * @param {string} roleId
     * @return {Promise<MstRole|null>}
     */
    async findByRoleId(roleId) {
        const mstRole = new MstRole();
        const childNodePath = `${roleId}`;

        return await mstRole.find(childNodePath);
    }
};
