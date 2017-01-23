var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./userSqlMapping');

var pool = mysql.createPool(conf.mysql);

var jsonWrite = function(res,ret){
    if(typeof ret === 'undefined'){
        res.json({code:1,msg:'操作失败'});
    }else{
        res.json(ret);
    }
};

module.exports = {
    queryAll: function(req, res, next){
        pool.getConnection(function(err, connection){
            var param = req.query || req.params;

            connection.query(sql.queryAll, function(err, result){
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    add: function(req, res, next){
        pool.getConnection(function(err, connection){
            var param = req.body;

            connection.query(sql.insert, [param.name, param.password, param.email], function(err, result){
                if(result){
                    result = {code:200,msg:'增加成功'};
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    delete: function(req, res, next){
        pool.getConnection(function(err, conn){
            var id = +req.query.id;
            conn.query(sql.delete, id, function(err, result){
                if(result.affectedRows > 0){
                    result = {
                        code: 200,
                        msg: '成功删除'
                    }
                }else{
                    result = void 0;
                }
                jsonWrite(res, result);
                conn.release();
            });
        });
    },
    update: function(req, res, next){
        var param = req.body;
        if( param.name == null || param.password == null || param.id == null){
            jsonWrite(res,undefined);
            return;
        }
        pool.getConnection(function(err,conn){
            conn.query(sql.update,[param.name,param.password,param.id,param.email,param.update_time],function(err, result){
                if(result.affectedRows > 0){
                    res.render('suc', {result: result});
                }else{
                    res.render('fail',{result:result});
                }
                conn.release();
            });
        });
    },
    queryById: function(req,res,next){
        var id = +req.query.id;
        pool.getConnection(function(err,conn){
            conn.query(sql.queryById, id, function(err, result){
                jsonWrite(res,result);
                conn.release();
            });
        });
    }
};
