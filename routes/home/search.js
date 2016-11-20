var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function search(req, res) {
	var content = req.query.content;

	var o = {},
		connection = mysql.createConnection($conf);
	
    connection.connect();

    console.log(content)

    // 查询数据库
    connection.query(
        'select * from books where CONCAT(`bname`,`book_concern`,`author`) like ?',
        ['%' + content + '%'],
        function(err, rows, fields) {
            if (err) {
                throw err;
                o = send(false, '系统出错，请联系开发人员');
            } else if (rows.length == 0) {
                o = send(false, '账号或密码错误');
            } else {
                o = send(true, '成功', {results: rows});
            }
            res.send(o)
        }
    )
}
module.exports = search