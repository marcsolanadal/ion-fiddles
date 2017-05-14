const express = require('express');
const path = require('path');

// Getting the config variables
const {
  config: {
    fiddle,
    front: {
      hostname,
      port
    }
  }
} = require('./package.json');

// Setting up fiddle path
const fiddlePath = path.join(__dirname, 'fiddles', fiddle);

const app = express();

// Serve static assets
app.use(express.static(fiddlePath));

// Always return the main index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(fiddlePath, 'index.html'));
});

app.listen(port, hostname, function() {
  console.log(`Fiddle ${fiddle} running on ${hostname}:${port}...`);
});
