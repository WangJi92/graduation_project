var mysql = require('mysql');
var send = require('../lib/util').send;
var md5 = require('../lib/util').md5;
var $conf = require('../../dbConfig');

function login(req, res) {
	var username = req.body.username.toString().trim(),
		password = req.body.password.toString().trim();

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
        'select * from admin_user where auser=? and apsword=?',
        [username, md5(password)],
        function(err, rows, fields) {
            if (err) {
                throw err;
       			o = send(false, '系统出错，请联系开发人员');
            } else if (rows.length == 0) {
   				o = send(false, '账号或密码错误');
            } else {
   				req.session.user = {
                    aid : rows[0].aid,
                    auser :rows[0].auser
                };
            	o = send(true, '登录成功');
            }
        	res.send(o)
        }
    )
}
module.exports = login