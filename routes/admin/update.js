var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function update(req, res) {
	var data = req.body,
		now = parseInt(new Date().getTime()/1000),
		val = {
			bname: data.bookname, 
			count: data.count, 
			book_concern: data.concern, 
			author: data.author, 
			tid: data.category, 
			uid: '0', 
			deposit_status: data.status, 
			modify_time: now, 
			cover_img: data.img, 
			book_desc: data.desc
		};
		console.log(data.desc)
	var o = {},
		connection = mysql.createConnection($conf);
	connection.connect();

	if (data.status == 0) {
		connection.query(
			'update books set ? where bid=?',
			[val , data.bid],
			function(err, rows, fields) {
				if (err) {
					throw err;
				} else if (rows.length == 0) {
					
				} else {
					res.send(send(true, '修改成功'));
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
	    			val.uid = rows[0].uid;
				    connection.query(
						'update books set ? where bid=?',
						[val, data.bid],
						function(err, rows, fields) {
							if (err) {
								throw err;
							} else if (rows.length == 0) {

							} else {
								res.send(send(true, '修改成功'));
							}
						}
					)
	    		}
	    	}
	    )
	}
}

module.exports = update;