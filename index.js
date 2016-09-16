var http = require('http');
var express = require('express');
var parseString = require('xml2js').parseString;
var app = express();

app.set('port', (process.env.PORT || 8080));

app.get("/", function (req, res) {

    var gsaReq = http.get("http://www.igepn.edu.ec/portal/ultimo-sismo/events.xml", function (response) {
        var completeResponse = '';

        response.on('data', function (chunk) {
            completeResponse += chunk;
            //res.send(response.toString());
            //res.setHeader('Content-Type', 'application/json');
            //res.send(JSON.stringify(response));
        });
        response.on('end', function() {
            //console.log(completeResponse);
            parseString(completeResponse, function (err, result) {
                //console.dir(result);
                var obj = result.markers.marker;
                for(i in obj){
                  //console.log(obj[i].$);
                }

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result.markers.marker));
                //res.send("s");
            });
        })
    }).on('error', function (e) {
      res.send(e.message);
        console.log('problem with request: ' + e.message);
    });

});

//app.listen(3000);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
