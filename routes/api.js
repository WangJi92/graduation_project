var express = require('express');
var router = express.Router();



router.post('/admin/login', require('./admin/login'))
	.get('/admin/logout', require('./admin/logout'))
	.get('/admin/list', require('./admin/list'))
	.post('/admin/add', require('./admin/add'))
	.get('/admin/destory', require('./admin/destory'))
	.get('/admin/categoryMap', require('./admin/categoryMap'))
	.get('/admin/book', require('./admin/book'))
	.post('/admin/update', require('./admin/update'))
	.get('/home/getUserInfo', require('./home/getUserInfo'))
	.get('/home/index', require('./home/index'))
	.post('/home/signUp', require('./home/signUp'))
	.post('/home/signIn', require('./home/signIn'))
	.get('/home/search', require('./home/search'))

module.exports = router;