const CloudStorageService = require('../../Services/CloudStorage/CloudStorageService');

module.exports = class MessageOutput {
    /**  @type {TrnMessage[]} */
    trnMessageList = [];

    /**
     * @param {TrnMessage[]} trnMessageList
     */
    constructor(trnMessageList) {
        this.trnMessageList = trnMessageList;
        this.cloudStorageService = new CloudStorageService();
    }

    async getOutput() {
        return {
            trn_message_list: await Promise.all(
                this.trnMessageList.map(async (trnMessage) => {
                    return {
                        id: trnMessage.id,
                        text: trnMessage.text,
                        coordinates_x: trnMessage.coordinates_x,
                        coordinates_y: trnMessage.coordinates_y,
                        good: trnMessage.good,
                        reply_id_list: trnMessage.reply_id_list,
                        limit: trnMessage.limit,
                        attached_file_url: await this.cloudStorageService.getDownloadUrl(trnMessage.attached_file_path),
                        is_edited: trnMessage.is_edited,
                        is_expired: trnMessage.is_expired,
                        is_pinned: trnMessage.is_pinned,
                        created_by: trnMessage.created_by,
                        updated_by: trnMessage.updated_by,
                        created_at: trnMessage.created_at,
                        updated_at: trnMessage.updated_at,
                        deleted_at: trnMessage.deleted_at,
                    };
                }),
            ),
        };
    }
};
