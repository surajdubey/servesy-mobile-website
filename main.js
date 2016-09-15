var fs = require('fs');
var path = require('path');
var express = require('express');
// var https = require('https');
var app = express();
var PORT = process.env.PORT || 8080

var privateKey = fs.readFileSync('./ssl/privkey.pem');
var certificate = fs.readFileSync('./ssl/cert.pem');

//setup https


// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}


// var httpsCredentials = {
//     key: privateKey,
//     cert: certificate
// };



//setup https
// var httpsCredentials = {
//     key: privateKey,
//     cert: certificate,
//     requestCert: false,
//     rejectUnauthorized: false
// };

app.use(express.static(path.join(__dirname, 'dist')));

// var server = https.createServer(httpsCredentials, app).

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

// https.createServer(httpsCredentials, app).listen(PORT, function(error) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser. Mode:%s", PORT, PORT, process.env.NODE_ENV);
//   }
// });


app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser. Mode:%s", PORT, PORT, process.env.NODE_ENV);
  }
});
