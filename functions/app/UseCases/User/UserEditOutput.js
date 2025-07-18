module.exports = class UserEditOutput {
    trnUser = {};

    /**
     * @param {TrnUser} trnUser
     */
    constructor(trnUser) {
        this.trnUser = trnUser;
    }

    getOutput() {
        return {
            id: this.trnUser.id,
            name: this.trnUser.name,
        };
    }
};
