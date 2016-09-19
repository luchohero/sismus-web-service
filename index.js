var http = require('http');
var express = require('express');
var parseString = require('xml2js').parseString;
var app = express();
function dateFormat(d)
	{
		return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	}

  function llenar_fecha(){
    var f = new Date();
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    return diasSemana[f.getDay()]+" "+f.getDate()+" de "+meses[f.getMonth()];
  }



  function llenar_hora(fecha){

  if(fecha.getMinutes()<10){
  var minutos = "0"+fecha.getMinutes();
  }else{var minutos = fecha.getMinutes();}

  if(fecha.getSeconds()<10){
  var segundos= "0"+fecha.getSeconds();
  }else{var segundos = fecha.getSeconds();}

  return fecha.getHours()+":"+minutos+":"+segundos;
  }

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
                  var fecha = new Date(obj[i].$.fecha);
                  var tz=5;
                  var seconds=(tz*60*60)*1000;
                  console.log(obj[i].$.fecha);
                  fecha.setTime(fecha.getTime()-seconds);
                  console.log(dateFormat(fecha));
                  var imge = "http://www.igepn.edu.ec/portal/ultimo-sismo/event/"+obj[i].$.eventoid+"/"+obj[i].$.eventoid+"-gmapa.png";
                  objeto.push({"id":obj[i].$.eventoid,"lat":obj[i].$.lat,"long":obj[i].$.lng,"mag":obj[i].$.mg,"prof":obj[i].$.z,"fecha":llenar_fecha(fecha),"hora":llenar_hora(fecha),"img":imge,"direccion":obj[i].$.localizacion});


                  //console.log(obj[i].$.lat);
                }
                //console.log(objeto);
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
