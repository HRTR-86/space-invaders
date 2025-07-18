module.exports = class BaseInput {
    /**
     * 数値型のパラメータを取得する
     *
     * @param args
     * @param key
     * @return {number}
     */
    getParameterToInteger(args, key) {
        if (!Object.hasOwn(args, key)) {
            return 0;
        }

        return Number(args[key]);
    }

    /**
     * 文字列型のパラメータを取得する
     *
     * @param args
     * @param key
     * @return {string}
     */
    getParameterToString(args, key) {
        if (!Object.hasOwn(args, key)) {
            return '';
        }

        return String(args[key]);
    }

    /**
     * 真偽値型のパラメータを取得する
     *
     * @param args
     * @param key
     * @return {boolean}
     */
    getParameterToBoolean(args, key) {
        if (!Object.hasOwn(args, key)) {
            return false;
        }

        return Boolean(args[key]);
    }
};
