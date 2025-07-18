const admin = require('firebase-admin');
const dayjs = require('dayjs');

module.exports = class CloudStorageService {
    /**
     * ユニークなファイル名を取得する
     *
     * @param {string} fileName
     * @return {string}
     */
    createUniqueFileName(fileName) {
        const timestamp = new Date().getTime();
        const randomNumber = `${Math.floor(Math.random() * 100000)}`;
        const zeroPaddingNumber = randomNumber.padStart(6, '0');

        return `${timestamp}${zeroPaddingNumber}${fileName}`;
    }

    /**
     * フォルダーのパス（掲示板）を取得する
     *
     * @return {string}
     */
    getBoardFolderPath() {
        return 'images/board';
    }

    /**
     * ダウンロードURLを取得する
     *
     * @return {string}
     */
    async getDownloadUrl(filePath) {
        if (filePath === '') {
            return '';
        }

        const bucket = admin.storage().bucket();
        const file = bucket.file(filePath);
        const expires = dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');

        const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: expires,
        });

        return signedUrl;
    }

    /**
     * ファイルをStorageに保存する
     *
     * @param attachedFile
     * @return {Promise<string>}
     */
    async upload(attachedFile) {
        const fileName = this.createUniqueFileName(attachedFile.name);
        const filePath = `${this.getBoardFolderPath()}/${fileName}`;
        const [, data] = attachedFile.data.split(',');

        const bucket = admin.storage().bucket();
        const file = bucket.file(filePath);
        const buffer = Buffer.from(data, 'base64');

        await file.save(buffer, {
            metadata: {
                contentType: attachedFile.mimeType,
            },
        });

        return filePath;
    }
};
