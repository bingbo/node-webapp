var user = {
    insert: 'insert into user(name, password, email) values(?,?,?)',
    update: 'update user set  name=?, password=?, email=?, update_time=? where id=?',
    delete: 'delete from user where id=?',
    queryAll: 'select * from user',
    queryById: 'select * from user where id=?'
};

module.exports = user;
