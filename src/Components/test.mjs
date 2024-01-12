import spotify from "./Playlist.mjs";
import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/'
});

spotifyApi.setAccessToken(`${spotify.get_Accesstoken()}`);

spotifyApi.createPlaylist('My playlist', { 'description': 'My description', 'public': true })
  .then(function(data) {
    console.log('Created playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
});

const data = await spotify.search('dsp');
console.log(typeof data[0].name);

