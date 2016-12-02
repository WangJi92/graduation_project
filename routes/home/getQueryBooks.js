var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getQueryBooks(req, res) {
	var	query = req.query,
		pageSize = query.pageSize || 20,
		page = query.page || 1,
		school = query.school ? (' and school_id=' + query.school) : '',
		category = query.category ? (' and tid=' + query.category) : '',
		uid = query.uid ? (' and b.uid=' + query.uid) : '',
		degree = query.degree ? (' and degree=' + query.degree) : '',
		deposit_status = query.deposit_status ? (' and deposit_status=' + query.deposit_status) : '',

		order_heat = query.heat ? 'heat desc,' : '',
		keyword = query.keyword ? " and CONCAT(`bname`,`book_concern`,`author`, `book_desc`, `school_name`) like '%" + query.keyword + "%'" : '';

	var connection = mysql.createConnection($conf),
			o = {};

		connection.connect();
		connection.query(
			'select * from (books b left join users on b.uid = users.uid left join schools on schools.id=users.school_id) where 1=1 ' + 
			school + category + uid + degree + deposit_status +
			keyword +
			' order by ' + order_heat + ' modify_time desc' + 
			' limit ' + (page - 1) * pageSize + ',' + page * pageSize,
			[],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
					res.send(o);
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！')
					res.send(o);
				} else {
					o = send(true, '成功', {page: page, pageSize: pageSize , books: rows});
					connection.query(
						'select count(*) as total from (books b left join users on b.uid = users.uid) where 1=1 ' + 
						school + category + uid + degree + deposit_status,
						[],
						function(err, rows, fields) {
							o.totalPage = Math.ceil(rows[0].total/pageSize);
							o.total = rows[0].total;
							res.send(o);
						}
					);
				}
			}
		)

} 

module.exports = getQueryBooks;