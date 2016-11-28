var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function add(req, res) {
	var data = req.body,
		now = parseInt(new Date().getTime()/1000);
	var o = {},
		connection = mysql.createConnection($conf);
	connection.connect();
	if (data.status == 0) {
		connection.query(
			'insert into books (bname, count, book_concern, author, tid, uid, deposit_status, publish_time, modify_time, cover_img, book_desc)' + 
			'values (?,?,?,?,?,?,?,?,?,?,?)',
			[data.bookname, data.count, data.concern, data.author, data.category, '0', data.status, now, now, data.img, data.desc],
			function(err, rows, fields) {
				if (err) {
					throw err;
				} else if (rows.length == 0) {
					
				} else {
					res.send(send(true, '添加成功'));
				}
			}
		)
	} else {
		connection.query(
	    	'select uid from users where true_name=?',
	    	[data.user],
	    	function(err, rows, fields) {
	    		if (err) {
	    			throw err;
	    		} else if (rows.length == 0) {
	    			res.send(send('false', '请输入正确的联系人'))
	    		} else {
	    			var uid = rows[0].uid;
				    connection.query(
						'insert into books (bname, count, book_concern, author, tid, uid, deposit_status, publish_time, modify_time, cover_img, book_desc)' + 
						'values (?,?,?,?,?,?,?,?,?,?,?)',
						[data.bookname, data.count, data.concern, data.author, data.category, uid, data.status, now, now, data.img, data.desc],
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
	    	}
	    )
	}
}

module.exports = add;