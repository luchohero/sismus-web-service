var express = require('express');
var app = express();
var parseString = require('xml2js');

app.set('port', (process.env.PORT || 5000));
app.get("/", function (req, res) {

res.send("luis");
});

//app.listen(3000);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
