var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port,function(){
    console.log("Server andando");
});

app.post("/crearPersonas", function(req,res){

    var nombre = null;
    var apellido = null;
    var dni = null;

    if(req.body.hasOwnProperty("nombre"))
        nombre = req.body.nombre;

    if(req.body.hasOwnProperty("apellido"))
        apellido = req.body.apellido;

    if(req.body.hasOwnProperty("dni"))
        dni = req.body.dni;

    //Ambos campos sean obligatorios
    if(dni == null || apellido == null){ 
        res.status(400).end();
        return ;
    }

    //Tamanio de ambos campos sea mayor a 0
    if(dni.length == 0 || apellido.length == 0){ 
        res.status(400).end();
        return; 
    }   

    //Ambos campos sean de tipo string
    if((typeof(nombre) != "string" && nombre != null) || typeof(apellido) != "string"){
        res.status(400).end();
        return;
    }
    //Apellido y nombre sean validos.
    if(apellido.match(/[0-9]/) != null || (nombre != null && nombre.match(/[0-9]/) != null)){
        res.status(400).end();
        return;
    }

    //Ingreso solo numeros
    if(dni.match(/[0-9]/) != null){ 
        res.status(400).end();
        return;
    }

    //Maximo 10 caracteres
    if(dni.length > 10){ 
        res.status(400).end();
        return;
    }

    //Si hay mas atributos que los mencionados
    if((nombre != null && req.body.length > 3) || (nombre == null && req.body.length > 2)){
        res.status(400).end();
        return;
    }    

    const http = require('request-promise');

    var datos = {
        method: 'POST',
        uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        body: {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
        },
        json: true,
    };

    http(datos)
    .then(function(response){
        console.log(response);
    })
    .catch(function(err){
        res.status(500).end(); //El servidor se encontro con una situacion que no sabe manejar.
        console.error('Ha ocurrido un error al subir',err);
    });

    //Todo OK
    res.status(201).send(JSON.stringify(req.body));
    console.log(req.body);
});