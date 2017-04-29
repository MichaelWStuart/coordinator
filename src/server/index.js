import {} from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';
import User from './models/user';
import Venue from './models/venue';
import venuesRoutes from './routes/venues';
import authRoutes from './routes/auth';

const app = express();

mongoose.connect(`mongodb://${process.env.UNAME}:${process.env.PASS}@${process.env.LOC}:${process.env.MDBPORT}/${APP_NAME}`);
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: `${isProd ? 'https://coordinator-app.herokuapp.com' : 'http://localhost:8080'}/auth/facebook/callback`,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ profileId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);
    const newUser = new User();
    newUser.profileId = profile.id;
    newUser.token = accessToken;
    newUser.save(() => done(null, newUser));
  });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
app.use(passport.initialize());
app.use(passport.session());

app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/venues', venuesRoutes);
app.use('/auth/facebook', authRoutes);
app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')));

app.get('/', (req, res) => {
  const user = req.user && { profileId: req.user.profileId, _id: req.user._id };
  Venue.find({}, (err, venues) => {
    res.send(renderApp(user, venues));
  });
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
