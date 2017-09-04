var express = require('express');
var app = express();
var path = require('path');

// __dirname will use the current path from where you run this file 
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/FOLDERTOHTMLFILESTOSERVER')));

app.listen(8080, "0.0.0.0");

console.log('Listening on port 8080');
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('Local IP: ' + add);
})