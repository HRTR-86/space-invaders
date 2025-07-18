module.exports = class LoginOutput {
    trnUser = null;

    /**
     * @param {TrnUser} trnUser
     */
    constructor(trnUser) {
        this.trnUser = trnUser;
    }

    getOutput() {
        return {
            trn_user: {
                id: this.trnUser.id,
                name: this.trnUser.name,
                photo_url: this.trnUser.photo_url,
                role_id: this.trnUser.role_id,
                is_suspension: this.trnUser.is_suspension,
            },
        };
    }
};
