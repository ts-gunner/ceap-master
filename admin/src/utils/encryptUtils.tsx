import CryptoJS from "crypto-js";

export function encryptByMd5(value:string) {
    
    return CryptoJS.MD5(value).toString();
}