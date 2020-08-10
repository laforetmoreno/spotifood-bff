const querystring = require('querystring');
const generateRandomString = require('../helpers/generateRandomString');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_STATE_KEY,
  SPOTIFY_ACCOUNTS_AUTORIZE_URI,
  SPOTIFY_SCOPE,
} = process.env;

const login = (req, res) => {
  try {
    const state = generateRandomString(16);
    res.cookie(SPOTIFY_STATE_KEY, state);
    const query = querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: SPOTIFY_SCOPE,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      state,
    });

    res.redirect(`${SPOTIFY_ACCOUNTS_AUTORIZE_URI}${query}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
