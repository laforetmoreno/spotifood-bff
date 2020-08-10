const request = require('request');

const {
  SPOTIFY_ACCOUNTS_TOKEN_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} = process.env;

const refreshToken = (req, res) => {
  try {
    const refresh_token = req.query.refresh_token;

    const authOptions = {
      url: SPOTIFY_ACCOUNTS_TOKEN_URI,
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
            'base64'
          ),
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send({ access_token: body.access_token });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = refreshToken;
