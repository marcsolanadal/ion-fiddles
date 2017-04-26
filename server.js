var express = require('express');
var path = require('path');
var morgan = require('morgan');
var config = require('./package.json').config;

// Setting up fiddle path
var fiddlePath = path.join(__dirname, 'fiddles', config.fiddle);

var app = express();

// Minimal logging
app.use(morgan('tiny'));

// Serve static assets
app.use(express.static(fiddlePath));

// Always return the main index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(fiddlePath, 'index.html'));
});

app.listen(config.port, config.server, function () {
  console.log('Example app listening on port ' + config.server + ':' + config.port + '...');
});
