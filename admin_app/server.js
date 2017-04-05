// server.js
const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files
// in the dist directory
console.log("hi", __dirname);
app.use(express.static(__dirname + '/www/js'));

app.set('views', __dirname + '/www/templates');
// Start the app by listening on the default
// Heroku port

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(process.env.PORT || 8080);