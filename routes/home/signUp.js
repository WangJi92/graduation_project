var mysql = require('mysql');
var send = require('../lib/util').send;
var md5 = require('../lib/util').md5;
var $conf = require('../../dbConfig');

function signUp(req, res) {
    var username = req.body.username.toString().trim(),
        password = req.body.password.toString().trim(),
    email = req.body.email.toString().trim(),
    tel = req.body.tel.toString().trim(),
    school_id = +req.body.school_id,
    truename = req.body.truename.toString().trim(),
    now = parseInt(new Date().getTime()/1000);

    var o = {},
        connection = mysql.createConnection($conf);
    connection.connect();

    // 判空
    if (username == '') {
        o = send(false, '账号不能为空');
        res.send(o);
        return ;
    } else if (password == '') {
        o = send(false, '密码不能为空')
        res.send(o);
        return ;
    }
    // 查询数据库
    
    connection.query(
        'select * from users where uname=? or email=?',
        [username, email],
        function(err, rows, fields) {
            if (err) {
              throw err;
            } else if (rows.length == 0) {
                connection.query(
                    'insert into users (uname, password, email, tel, sign_up_time, true_name, school_id, avatar)' + 
                    'values (?,?,?,?,?,?,?,?)',
                    [username, md5(password), email, tel, now, truename, school_id, '/images/uploadcache/0/avatar.jpg'],
                    function(err, rows, fields) {
                        if (err) {
                          throw err;
                        } else if (rows.length == 0) {
                          
                        } else {
                            connection.query(
                                'select * from users where uname=?',
                                [username],
                                function(err, rows, fields) {
                                    if (err) {
                                      throw err;
                                    } else if (rows.length == 0) {
                                      
                                    } else {
                                        req.session.user = {
                                            uid : rows[0].uid,
                                            uname :rows[0].uname
                                        };
                                        res.send(send(true, '添加成功'));
                                    }
                                }
                            );
                        }
                    }
                )
            } else {
                res.send(send(false, '用户名或邮箱已经存在'))
            }
        }
    )
}
module.exports = signUp