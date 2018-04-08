'use strict';
var config = require('./config.js');
var crypto = require('crypto');

var util = {

    AESEncrypt: (string) => {
        const password = config.AESPassword;
        const algorithm = 'aes-256-ctr';

        const cipher = crypto.createCipher(algorithm, password);
        let crypted = cipher.update(string, 'utf8', 'hex');
        crypted += cipher.final('hex');

        return crypted;
    },

    AESDecrypt: (string) => {
        const password = config.AESPassword;
        const algorithm = 'aes-256-ctr';

        const decipher = crypto.createDecipher(algorithm, password);
        let decrypted = decipher.update(string, 'hex', 'utf8');
        decrypted += decipher.final();
        try {
            return JSON.parse(decrypted);
        }catch(e) {
            return false;
        }
    },

    convertToMB: (bytes) => {
        return (parseInt(bytes) / 1048576).toFixed(3);
    }
}

module.exports = util;
