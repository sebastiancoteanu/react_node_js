const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cookieSession({
        maxAge: 30 * 34 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session(

));

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

authRoutes(app);

app.listen(PORT);