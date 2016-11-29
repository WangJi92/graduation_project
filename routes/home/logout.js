var send = require('../lib/util').send;

function logout(req, res) {
    req.session.user = null;
    var o = send(true, '注销成功');
    res.send(o);
}
module.exports = logout