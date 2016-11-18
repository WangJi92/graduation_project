var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function categoryMap(req, res) {
	var o = {},
		connection = mysql.createConnection($conf);
	connection.connect();

  connection.query(
    'select * from book_type',
    [],
    function(err, rows, fields) {
      if (err) {
        throw err;
        o = send(false, '系统错误，请联系开发人员');
      } else if (rows.length == 0) {
        o = send(false, '还没有任何分类哦！');
      } else {
        o = send(true, '获取成功', {category: rows});
      }
      res.send(o);
    }
  )
}
module.exports = categoryMap