var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function destory(req, res) {
	var o = {},
		connection = mysql.createConnection($conf);
	connection.connect();

  connection.query(
    'delete from books where bid=?',
    [req.query.bid],
    function(err, rows, fields) {
      if (err) {
        throw err;
        o = send(false, '系统错误，请联系开发人员');
      } else if (rows.length == 0) {
        o = send(false, '删除失败请重试');
      } else {
        o = send(true, '删除成功');
      }
      res.send(o);
    }
  )
}
module.exports = destory