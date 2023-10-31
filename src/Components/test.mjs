import spotify from "./Playlist.mjs";
import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '12f36318142648afbd5d035f4845da27',
  clientSecret: '5494f4dfc66d47f09d220517fb73f89f',
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

