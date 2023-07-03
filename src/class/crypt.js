import CryptoJS from "crypto-js";

export default class Crypt{
    encryptData(data) {
        const key = import.meta.env.VITE_APP_KEY;
        return CryptoJS.AES.encrypt(data, key).toString();
    }
    decrypt(data) {
        const key = import.meta.env.VITE_APP_KEY;
        const bytes = CryptoJS.AES.decrypt(data, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
