module.exports = class ReplyAddOutput {
    trnReply = {};

    /**
     * @param {TrnReply} trnReply
     */
    constructor(trnReply) {
        this.trnReply = trnReply;
    }

    getOutput() {
        return {
            id: this.trnReply.id,
        };
    }
};
