import CryptoJS from "crypto-js";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

/**
 * Encrypts a plain text using AES-CBC with PKCS5Padding.
 * @param {string} plainText - The plain text to be encrypted.
 * @param {string} secretKey - The secret key (32 characters for 256 bits).
 * @param {string} iv - The initialization vector (16 characters for 128 bits).
 * @returns {string} - The encrypted text in hexadecimal format.
 */
export function encryptAES(
  plainText: string,
  secretKey: string,
  iv: string
): string {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const ivParsed = CryptoJS.enc.Utf8.parse(iv);

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: ivParsed,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7, // PKCS7 is equivalent to PKCS5 for AES (16-byte blocks)
  });

  // Convert encrypted data to hexadecimal format
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

/**
 * Decrypts an encrypted text using AES-CBC with PKCS5Padding
 * @param {string} cipherText - The encrypted text in Base64 format
 * @param {string} secretKey - The secret key (32 bytes/256 bits)
 * @param {string} iv - The initialization vector (16 bytes/128 bits)
 * @returns {string} - The decrypted plain text
 */
export function decryptAES(cipherTextHex: string): string {
  const secretKey = process.env.AES_SECRET_KEY || "";
  const iv = process.env.AES_IV || "";
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const ivParsed = CryptoJS.enc.Utf8.parse(iv);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(cipherTextHex),
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: ivParsed,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7, // PKCS7 is equivalent to PKCS5 for AES (16-byte blocks)
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Generates a UUID and its MD5 hash.
 * @returns {object} An object containing the UUID and its MD5 hash.
 */
export function generateSecureKey() {
  const uuid = uuidv4();
  const md5Hash = crypto.createHash("md5").update(uuid).digest("hex");
  return {
    uuid,
    md5Hash,
  };
}
