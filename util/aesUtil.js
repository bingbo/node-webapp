var crypto = require("crypto");

module.exports = {
    /**
     * aes-128-cbc对称加密
     * @param {String} data，加密的明文
     * @param {String} secretKey，密钥
     * @param {Buffer} iv，向量，16位字节数组
     * @return {String} 密文
     * @api public
     * @remark 密钥的生成规则：普通字符串，用UTF8转换成Buffer后，需要对此计算MD5，再转换成Buffer对象。
     */
    cbcEncrypt: function (data, secretKey, iv) {
        iv = new Buffer(iv, "utf8");
        secretKey = new Buffer(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = new Buffer(secretKey, "hex");
        var cipher = crypto.createCipheriv("aes-128-cbc", secretKey, iv), coder = [];
        coder.push(cipher.update(data, "utf8", "hex"));
        coder.push(cipher.final("hex"));
        return coder.join("");
    },

    /**
     * aes-128-ecb对称解密
     * @param {String} data，解密的密文
     * @param {String} secretKey，密钥
     * @param {Buffer} iv，向量，16位字节数组
     * @return {String} 明文
     * @api public
     */
    cbcDecrypt: function (data, secretKey, iv) {
        iv = new Buffer(iv, "utf8");
        secretKey = Buffer(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = new Buffer(secretKey, "hex");
        var cipher = crypto.createDecipheriv("aes-128-cbc", secretKey, iv), coder = [];
        coder.push(cipher.update(data, "hex", "utf8"));
        coder.push(cipher.final("utf8"));
        return coder.join("");
    }


}