require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var Spotify = require('spotify-web-api-node');
var fs = require('fs');

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
    spotify.authorizationCodeGrant(req.query.code)
    .then(function(data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
      refresh_token = data.body['refresh_token'];

      // Set the access token on the API object to use it in later calls
      spotify.setAccessToken(data.body['access_token']);
      spotify.setRefreshToken(data.body['refresh_token']);

      fs.writeFile('token.txt', refresh_token)
      // getTracks();
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    // get the things
    res.sendFile(__dirname + '/done.html');
});

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(){
  console.log('Listening on port', port + '...');
});
