module.exports = class MessageEditPinnedOutput {
    trnMessage = {};

    /**
     * @param {TrnMessage} trnMessage
     */
    constructor(trnMessage) {
        this.trnMessage = trnMessage;
    }

    getOutput() {
        return {
            id: this.trnMessage.id,
        };
    }
};
