var express = require('express');
var path = require('path');
var morgan = require('morgan');

var PORT = 3007;
var HOST = 'localhost'

var app = express();

app.use(morgan('tiny'));

// Serve static assets
app.use(express.static(__dirname));

// Always return the main index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, function () {
  console.log('Example app listening on port ' + HOST + ':' + PORT + '...');
});
