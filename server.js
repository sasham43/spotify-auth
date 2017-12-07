var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/auth', function(req, res, next){
    // spotify stuff
    res.send('stuff')
});

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(){
  console.log('Listening on port', port + '...');
});
