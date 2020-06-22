const createError = require('http-errors');
const express     = require('express');
const bodyParser  = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({limit:'20mb',extended: true }));
app.use(bodyParser.json({limit:'20mb'})); // for parsing application/json
const options = {
  dotfiles: 'ignore',
  extensions: ['html'],
  index: "index.html"
}
app.use(express.static('.',options));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  //console.log(req);
  console.error('Error handler',err);
  res.status(err.status || 500).send('出错啦，请重新尝试. xagfans.com'+ err.status +":"+ err.message);
});

module.exports = app;
