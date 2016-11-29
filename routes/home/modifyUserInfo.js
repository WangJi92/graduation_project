var mysql = require('mysql');
var send = require('../lib/util').send;
var md5 = require('../lib/util').md5;
var $conf = require('../../dbConfig');

function modifyUserInfo(req, res) {
    var data = req.body,
        val = {
            password: data.password, 
            email: data.email, 
            tel: data.tel, 
            true_name: data.truename
        };
    
    var o = {},
        connection = mysql.createConnection($conf);
    connection.connect();

    // 查询数据库
    connection.query(
      'update users set ? where uid=?',
      [val , data.uid],
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
module.exports = modifyUserInfo