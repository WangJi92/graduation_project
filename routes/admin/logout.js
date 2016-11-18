var send = require('../lib/util').send;

function logout(req, res) {
	  req.session.user = null;
  	o = send(true, '退出成功');
    res.send(o);
}
module.exports = logout