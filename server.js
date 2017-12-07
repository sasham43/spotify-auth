require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var Spotify = require('spotify-web-api-node');

var scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-top-read', 'user-read-recently-played', 'user-read-currently-playing', 'user-modify-playback-state', 'user-read-playback-state'],
    redirectUri = 'http://localhost:3009/callback',
    clientId = process.env.SPOTIFY_ID,
    clientSecret = process.env.SPOTIFY_SECRET,
    state = 'coco-downtown';

var spotify = new Spotify({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
});

app.get('/auth', function(req, res, next){
    var authorizeURL = spotify.createAuthorizeURL(scopes, state);

    console.log(authorizeURL);

    res.send(authorizeURL);
});

app.get('/callback', function(req, res, next){
    console.log('query', req.query);
    // get the things
    res.sendFile(__dirname + '/done.html');
});

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(){
  console.log('Listening on port', port + '...');
});
