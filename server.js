const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { config } = require('./package.json');

// Getting the config variables
const { fiddle, hostname, port } = config;

// Setting up fiddle path
const fiddlePath = path.join(__dirname, 'fiddles', fiddle);

const app = express();

// Minimal logging
app.use(morgan('tiny'));

// Serve static assets
app.use(express.static(fiddlePath));

// Always return the main index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(fiddlePath, 'index.html'));
});

app.listen(config.port, config.server, function() {
  console.log(`Fiddle ${fiddle} running on ${hostname}:${port}...`);
});
