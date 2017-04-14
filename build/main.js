'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _wav = require('wav');

var _wav2 = _interopRequireDefault(_wav);

var _speaker = require('speaker');

var _speaker2 = _interopRequireDefault(_speaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = 3000;
app.use('/', function (req, res, next) {
  var bell = _fs2.default.createReadStream(__dirname + '/../bell.wav');
  var reader = new _wav2.default.Reader();
  reader.on('format', function (format) {
    // the WAVE header is stripped from the output of the reader
    console.log(format);
    reader.pipe(new _speaker2.default(format));
  });
  bell.pipe(reader);
  next();
});

app.use('/', _express2.default.static(__dirname + '/../public'));

app.get('/hello', function (req, res) {
  return res.send('Hello world!');
});

app.use('/posts', _posts2.default);

var server = app.listen(port, function () {
  console.log('Server is listening on port ', port);
});