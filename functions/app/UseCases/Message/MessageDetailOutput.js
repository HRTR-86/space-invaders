const CloudStorageService = require('../../Services/CloudStorage/CloudStorageService');

module.exports = class MessageDetailOutput {
    trnMessage = {};

    /**
     * @param {TrnMessage} trnMessage
     */
    constructor(trnMessage) {
        this.trnMessage = trnMessage;
        this.cloudStorageService = new CloudStorageService();
    }

    async getOutput() {
        return {
            trn_message: {
                id: this.trnMessage.id,
                channelId: this.trnMessage.channel_id,
                text: this.trnMessage.text,
                coordinates_x: this.trnMessage.coordinates_x,
                coordinates_y: this.trnMessage.coordinates_y,
                good: this.trnMessage.good,
                reply_id_list: this.trnMessage.reply_id_list,
                limit: this.trnMessage.limit,
                attached_file_url: await this.cloudStorageService.getDownloadUrl(this.trnMessage.attached_file_path),
                is_edited: this.trnMessage.is_edited,
                is_expired: this.trnMessage.is_expired,
                is_pinned: this.trnMessage.is_pinned,
                created_by: this.trnMessage.created_by,
                updated_by: this.trnMessage.updated_by,
                created_at: this.trnMessage.created_at,
                updated_at: this.trnMessage.updated_at,
                deleted_at: this.trnMessage.deleted_at,
            }
        };
    }
};
