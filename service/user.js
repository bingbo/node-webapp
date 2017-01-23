
exports.list = function(){
    var data;
    connection.connect();
    connection.query('select * from user', function(err, rows, fields){
        data = rows;
    });
    connection.end();
    return data;
};

