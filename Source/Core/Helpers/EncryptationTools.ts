/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import CryptoJS from 'crypto-js';

export function EncryptationHelper(userID: string, content: string, password: string): string {
    const reversedUserID = userID.split('').reverse().join('');
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const finalPassword = reversedUserID + hashedPassword;
    return CryptoJS.AES.encrypt(content, finalPassword).toString();
};

export function DecryptationHelper(userID: string, content: string, password: string): string {
    const reversedUserID = userID.split('').reverse().join('');
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const finalPassword = reversedUserID + hashedPassword;
    const bytes = CryptoJS.AES.decrypt(content, finalPassword);
    return bytes.toString(CryptoJS.enc.Utf8);
};