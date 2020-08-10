const querystring = require('querystring');
const request = require('request');

const {
  SPOTIFY_ACCOUNTS_TOKEN_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_STATE_KEY,
  CLIENT_URL,
} = process.env;

const callback = (req, res) => {
  try {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[SPOTIFY_STATE_KEY] : null;

    if (state === null || state !== storedState) {
      res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    } else {
      res.clearCookie(SPOTIFY_STATE_KEY);
      const authOptions = {
        url: SPOTIFY_ACCOUNTS_TOKEN_URI,
        form: {
          code,
          redirect_uri: SPOTIFY_REDIRECT_URI,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization:
            'Basic ' +
            new Buffer(
              SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
        },
        json: true,
      };

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          res.redirect(
            `${CLIENT_URL}/#${querystring.stringify({
              access_token,
              refresh_token,
            })}`
          );
        } else {
          res.redirect(
            `/#${querystring.stringify({ error: 'invalid_token' })}`
          );
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = callback;
