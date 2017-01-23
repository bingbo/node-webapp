var express = require('express');
var crypto = require("crypto");
var http = require('http');
var querystring = require('querystring');
//var request = request.defaults({jar: true});
var router = express.Router();

var iv = new Buffer("1234567890123456","utf8");
var key = "3d8be02c70665eaba6877a67ce3d49b2";
var name = '张冰冰';

/* GET apis listing. */
router.get('/', function(req, res, next) {

    var str = cbcEncrypt(name, key, iv);
    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/web/tagview/list?type=0&taskId=365&tagId=1',
        agent: false,
        method: 'GET',
        headers: {
            'Cookie':'name='+str
        }
    };
    var request = http.get(options,function (response) {
        var rawData = '';
        response.on('data',function (chunk) {
            rawData+=chunk;
        });
        response.on('end',function () {
            res.send(rawData);
        })
    });
    request.on('error', function (e) {
        console.log(e.message);
    });


});

function cbcEncrypt(data, secretKey, iv) {
    secretKey = new Buffer(secretKey, "utf8");
    secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
    secretKey = new Buffer(secretKey, "hex");
    var cipher = crypto.createCipheriv("aes-128-cbc", secretKey, iv), coder = [];
    coder.push(cipher.update(data, "utf8", "hex"));
    coder.push(cipher.final("hex"));
    return coder.join("");
}
module.exports = router;
