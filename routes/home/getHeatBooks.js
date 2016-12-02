var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getHeatBooks(req, res) {
	var connection = mysql.createConnection($conf),
			o = {};

		connection.connect();
		connection.query(
			'select bid,bname,cover_img from books where deposit_status=0 order by heat desc limit 0,4',
			[],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！')
				} else {
					o = send(true, '成功', {books: rows});
				}
				res.send(o);
			}
		)

} 

module.exports = getHeatBooks;