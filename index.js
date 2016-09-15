var http = require('http');
var express = require('express');
var parseString = require('xml2js').parseString;

var app = express();
app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

//app.use('/static', express.static('public'));
app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
