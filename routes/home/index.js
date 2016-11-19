var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function index(req, res) {
	var pageSize = req.query.pageSize || 20,
		page = req.query.page;

	var connection = mysql.createConnection($conf),
			o = {};

		connection.connect();
		connection.query(
			'select bid,bname,cover_img,book_concern,author from books order by bid desc limit ' + (page - 1) * pageSize + ',' + page * pageSize,
			[],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！')
				} else {
					o = send(true, '成功', {page: page, pageSize: pageSize , books: rows});

					connection.query(
						'select count(*) as total from books',
						[],
						function(err, rows, fields) {
							o.totalPage = Math.ceil(rows[0].total/pageSize);
							res.send(o);
						}
					);


				}
			}
		)

} 

module.exports = index;