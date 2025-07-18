module.exports = class UserDetailOutput {
    trnUser = {};

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
            },
        };
    }
};
