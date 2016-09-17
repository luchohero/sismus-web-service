var http = require('http');
var express = require('express');
var parseString = require('xml2js').parseString;
var app = express();

app.set('port', (process.env.PORT || 8000));

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
                var objeto = Array();
                var obj = result.markers.marker;
                for(i in obj){
                  var imge = "http://www.igepn.edu.ec/portal/ultimo-sismo/event/"+obj[i].$.eventoid+"/"+obj[i].$.eventoid+"-gmapa.png";
                  objeto.push({"id":obj[i].$.eventoid,"lat":obj[i].$.lat,"long":obj[i].$.lng,"mag":obj[i].$.mg,"prof":obj[i].$.z,"fecha":obj[i].$.fecha,"hora":obj[i].$.fecha,"img":imge,"direccion":obj[i].$.localizacion});
                  //console.log(obj[i].$.lat);
                }
                console.log(objeto);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(objeto));
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
