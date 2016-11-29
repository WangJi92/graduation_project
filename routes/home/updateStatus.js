var mysql = require('mysql');
var send = require('../lib/util').send;
var md5 = require('../lib/util').md5;
var $conf = require('../../dbConfig');

function updateStatus(req, res) {
    var data = req.body,
        val = {
            deposit_status: 1
        };
    
    var o = {},
        connection = mysql.createConnection($conf);
    connection.connect();

    // 查询数据库
    connection.query(
      'update books set ? where bid=?',
      [val , +data.bid],
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
module.exports = updateStatus