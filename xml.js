var http = require('http');
var express = require('express');
var parseString = require('xml2js').parseString;
var app = express();

app.get("/", function (req, res) {

    var gsaReq = http.get("http://127.0.0.1/eventos.xml", function (response) {
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
                console.dir(result);
                var obj = result.markers.marker;
                for(i in obj){
                  console.log(obj[i].$);
                }

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result.markers.marker));
            });
        })
    }).on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

});

app.listen(3000);
