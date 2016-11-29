var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function publish(req, res) {
	var data = req.body,
		now = parseInt(new Date().getTime()/1000);
	var o = {},
		connection = mysql.createConnection($conf);
	connection.connect();
	
	connection.query(
		'insert into books (bname, count, book_concern, author, tid, uid, publish_time, modify_time, cover_img, book_desc)' + 
		'values (?,?,?,?,?,?,?,?,?,?,?)',
		[data.bookname, +data.count, data.concern, data.author, +data.category, +data.uid, now, now, data.img, data.desc],
		function(err, rows, fields) {
			if (err) {
				throw err;
			} else if (rows.length == 0) {
				
			} else {
				res.send(send(true, '添加成功'));
			}
		}
	)
}

module.exports = publish;