module.exports = class AuthorityListOutput {
    mstRole = null;

    /**
     * @param {MstRole} mstRole
     */
    constructor(mstRole) {
        this.mstRole = mstRole;
    }

    getOutput() {
        return {
            authority_id_list: Object.values(this.mstRole.authority).sort(),
        };
    }
};
