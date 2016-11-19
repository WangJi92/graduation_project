var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var less = require('less');
var api = require('./routes/api');
var upload = require('./routes/upload');

var app = express();

// view engine setup
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'zhaobin'
}));
var handleHtml = {
  //@note ejs编译
  compileEjs: function(filePath) {
    var content = fs.readFileSync(filePath);
    return ejs.render(content.toString(), {
      filename: filePath
    })
  },

  parsePath: function(filePath) {
    try {
      return this.compileEjs(filePath);
    } catch (e) {
      return e.message;
    }
  },

  //@note 处理html请求
  do: function(fixPath) {
    var self = this;
    return function(req, res) {
      if (req.path.indexOf('admin') !== -1 && req.path !== '/admin/login.html') {
        if (!req.session.user) {
          res.redirect('/admin/login.html');
          return;
        }
      }
      var filePath = (fixPath || '') + req.path;
      
      fs.stat(filePath, function(err, stats) {
        if (err || !stats.isFile()) {
          //@note 没有文件
          res.end("page is not found");
        } else {
          //@note 读取该文件
          res.end(self.parsePath(filePath));
        }
      })
    }
  }
};
var handleLess = {
    showError: function(e) {
        var spaces = '';
        var errorContent = e.filename + ' : ' + e.line + '\n\n';
        errorContent += '--------------------------' + '\n';
        errorContent += (e.extract[0] ? e.extract[0] : '') + '\n';
        errorContent += e.extract[1] + '\n';
        spaces += e.extract[1].match(/[\t]*/) && e.extract[1].match(/[\t]*/)[0];
        for (; e.column--;) spaces += ' ';
        errorContent += spaces + '^^' + '\n';
        errorContent += (e.extract[2] ? e.extract[2] : '') + '\n';
        errorContent += '--------------------------' + '\n\n';
        errorContent += 'message : ' + e.message;
        return errorContent;
    },
    do: function() {

        var self = this;
        return function(req, res) {
            //@note 设置响应头类型 
            res.setHeader('Content-Type', 'text/css');
            var path = __dirname + req.path;
            console.log(path)
            //less文件不存在 404
            if (!fs.existsSync(path)) {
                var err = new Error('Not Found');
                err.status = 404;
                res.status(err.status || 500);
                res.end(err.message);
                return;
            }

            var contentText = fs.readFileSync(path);
            less.render(contentText.toString(), {
                filename: path
            }, function(e, output) {
                if (e) {
                    res.end(self.showError(e));
                } else {
                    res.end(output.css);
                }
            });

        }
    }
};
app.get('/', function(req, res) {
  res.redirect('/home/index.html');
});
app.get('/home', function(req, res) {
  res.redirect('/home/index.html');
});
app.get('/admin', function(req, res) {
  res.redirect('/admin/index.html');
});
app.get('/*.html', handleHtml.do('views'))
app.get('/src/*.less', handleLess.do())

app.use(express.static(__dirname));

app.use('/api', api);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
