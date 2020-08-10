const request = require('request');

const { SPOTIFY_ACCOUNTS_TOKEN_URI } = process.env;

const refreshToken = (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: SPOTIFY_ACCOUNTS_TOKEN_URI,
    headers: {
      Authorization: `Basic ${new Buffer(
        `${client_id} : ${client_secret}`
      ).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send({ access_token: body.access_token });
    }
  });
};

module.exports = refreshToken;
