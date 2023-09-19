import crypto from "crypto";

class EncryptionUtil {
    private _algorithm: string = "aes-192-cbc";
    public encrypt(key: Buffer, iv: Buffer, data: string): string {
        const cipher = crypto.createCipheriv(this._algorithm, key, iv);
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
    }

    public decrypt(key: Buffer, iv: Buffer, encrypted: string) {
        const decipher = crypto.createDecipheriv(this._algorithm, key, iv);
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('binary');
    }
}

export default new EncryptionUtil();