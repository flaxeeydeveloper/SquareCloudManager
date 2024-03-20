/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.

    If you have new ideas for the API_KEY encryption structure, feel free to implement
*/

import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';

export function hashPassword(password: string) {
    const SALT_ROUNDS = 10;
    return bcrypt.hashSync(password, SALT_ROUNDS);
};

/* This function will only be used if the user has activated the module, so it will require the password from time to time to be able to use the api_key */
export async function comparePassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

export function API_KEY_EncryptationHelper(userID: string, content: string, password: string): string {
    const reversedUserID = userID.split('').reverse().join('');
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const finalPassword = reversedUserID + hashedPassword;
    const encryptedContent = CryptoJS.AES.encrypt(content, finalPassword).toString();
    return encryptedContent;
}

export function API_KEY_DecryptationHelper(userID: string, content: string, password: string): string {
    const reversedUserID = userID.split('').reverse().join('');
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const finalPassword = reversedUserID + hashedPassword;
    const decryptedBytes = CryptoJS.AES.decrypt(content, finalPassword);
    const decryptedContent = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedContent;
};
