module.exports = class ReplyOutput {
    /**  @type {TrnReply[]} */
    trnReplyList = [];

    /**
     * @param {TrnReply[]} trnReplyList
     */
    constructor(trnReplyList) {
        this.trnReplyList = trnReplyList;
    }

    async getOutput() {
        return {
            trn_reply_list: await Promise.all(
                this.trnReplyList.map(async (trnReply) => {
                    return {
                        id: trnReply.id,
                        text: trnReply.text,
                        message_id: trnReply.message_id,
                        is_edited: trnReply.is_edited,
                        created_by: trnReply.created_by,
                        updated_by: trnReply.updated_by,
                        created_at: trnReply.created_at,
                        updated_at: trnReply.updated_at,
                        deleted_at: trnReply.deleted_at,
                    };
                }),
            ),
        };
    }
};
