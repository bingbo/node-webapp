var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user/list');
  //res.send('respond with a resource');
});
router.get('/list', function(req, res, next){
    userDao.queryAll(req, res, next);
});
router.post('/add',function(req,res,next){
    userDao.add(req, res, next);
});

router.get('/get',function(req,res,next){
	userDao.queryById(req,res,next);
});

router.get('/remove',function(req,res,next){
	userDao.delete(req,res,next);
})

router.post('edit',function(req,res,next){
	userDao.update(req,res,next);
})

module.exports = router;
