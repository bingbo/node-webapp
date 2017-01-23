var express = require('express');
var crypto = require("crypto");
var http = require('http');
var querystring = require('querystring');
//var request = request.defaults({jar: true});
var router = express.Router();

var iv = "1234567890123456";
var key = "3d8be02c70665eaba6877a67ce3d49b2";
var name = '张冰冰';
var id = '91337';
var aesUtil = require('../util/aesUtil');
/* GET apis listing. */
router.get('/test/get', function(req, res, next) {

    var bname = aesUtil.cbcEncrypt(name, key, iv);
    var bid = aesUtil.cbcEncrypt(id, key, iv);
    var options = {
        hostname: 'localhost',
        port: 8081,
        path: '/json/aes',
        agent: false,
        method: 'GET',
        headers: {
            'Cookie':'bname='+bname+';bid='+bid
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

module.exports = router;
