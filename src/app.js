require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const refreshToken = require('./middlewares/refreshToken');
const callback = require('./middlewares/callback');
const login = require('./middlewares/login');

const { PORT } = process.env;

const app = express();

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.get('/login', login);
app.get('/callback', callback);
app.get('/refresh_token/:refresh_token?', refreshToken);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
