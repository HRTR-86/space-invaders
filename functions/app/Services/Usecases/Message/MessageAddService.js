const dayjs = require('dayjs');
const CloudStorageService = require('../../CloudStorage/CloudStorageService');
const MessageAddOutput = require('../../../UseCases/Message/MessageAddOutput');
const TrnMessageRepository = require('../../../Repositories/TrnMessageRepository');
const TrnMessage = require('../../../Models/Trn/TrnMessage');

module.exports = class MessageAddService {
    constructor() {
        this.trnMessageRepository = new TrnMessageRepository();
        this.cloudStorageService = new CloudStorageService();
    }

    /**
     * @param {MessageAddInput} input
     * @return {Promise<MessageAddOutput>}
     */
    async handle(input) {
        const uploadedFilePath = await this.uploadAttachedFile(input);
        const trnMessage = await this.addMessage(input, uploadedFilePath);

        return new MessageAddOutput(trnMessage);
    }

    /**
     * メッセージを追加する
     *
     * @param {MessageAddInput} input
     * @param {string} uploadedFilePath
     * @return {Promise<TrnMessage>}
     */
    async addMessage(input, uploadedFilePath) {
        const trnMessage = new TrnMessage();

        trnMessage.text = input.text;
        trnMessage.coordinates_x = input.coordinatesX;
        trnMessage.coordinates_y = input.coordinatesY;
        trnMessage.attached_file_path = uploadedFilePath;
        trnMessage.limit = this.calculateLimit();
        trnMessage.created_by = input.userId;
        trnMessage.updated_by = input.userId;

        return await this.trnMessageRepository.save(
            trnMessage,
            input.channelId,
        );
    }

    /**
     * 掲載期限を計算する
     *
     * @return {string}
     */
    calculateLimit() {
        const postedTime = dayjs();
        const limit = postedTime.add(7, 'day');

        return limit.format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * 添付ファイルを保存する
     *
     * @param {MessageAddInput} input
     * @return {Promise<string>}
     */
    async uploadAttachedFile(input) {
        if (input.attachedFile === null) {
            return '';
        }

        return await this.cloudStorageService.upload(input.attachedFile);
    }
};
