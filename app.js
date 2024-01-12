const querystring = require('querystring');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:3000/callback';
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
  const state = 'iopqwertyulkjasd';
  const scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })
  );
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch',
      })
    );
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer.from(client_id + ':' + client_secret).toString(
            'base64'
          ),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      // Handle the Spotify API token response here
      // You can send the token or any relevant data back to the React client
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.send({ error: 'Invalid token request' });
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
