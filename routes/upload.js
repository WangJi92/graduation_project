var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();
var cacheFolder = 'images/uploadcache/';
var UPLOAD_FOLDER = '/images/uploadcache/'

router.post('/', function(req, res) {
	var currentUser = req.session.user.aid || req.session.user.uid || 0;
	var userDirPath = cacheFolder + currentUser;

	if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 100 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            displayUrl = UPLOAD_FOLDER + currentUser + avatarName;
            fs.renameSync(files.upload.path, newPath); //重命名
            res.send({
                code: 200,
                msg: displayUrl
            });
        }
    });
})
module.exports = router