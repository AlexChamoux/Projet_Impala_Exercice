let http = require('http');
let hostname = '127.0.0.1';
let port = 5555;

let server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.write(
    '<!DOCTYPE html>'+
    '<html>'+
    ' <head>'+
    ' <meta charset="utf-8" />'+
    ' <title>Ma page Node.js !</title>'+
    ' </head>'+
    ' <body>'+
    ' <p>Voici un paragraphe <strong>HTML</strong> !</p>'+
    ' <p>Voici un autre paragraphe <strong>HTML</strong> !</p>'+
    ' </body>'+
    '</html>'
    );
  res.end();
});

server.listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});