var crypto = require('crypto');
function md5(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}
function send(success, message, option) {
	var o = {
		success: success,
		message: message || ''
	};
	for (var k in option) {
		o[k] = option[k]
	}
	return o;
}

module.exports = {
	md5: md5,
	send: send
}