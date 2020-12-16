const http = require('request-promise');

var consulta = {
    method: 'GET',
    uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
    json: true
};

http(consulta)
    .then(function(response){
        console.log(response);
    })

    .catch(function(err){
        console.error('Fallo en la consulta',err);
    });
    