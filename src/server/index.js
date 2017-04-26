import {} from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import fetch from 'isomorphic-fetch';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';
import User from './models/user';
import Venue from './models/venue';

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: `${isProd ? 'herokupage' : 'http://localhost:8080'}/auth/facebook/callback`,
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

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

mongoose.connect(`mongodb://${process.env.UNAME}:${process.env.PASS}@${process.env.LOC}:${process.env.MDBPORT}/${APP_NAME}`);
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitiated: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => req.login(null, () => res.redirect('/')));

app.post('/venues/add-attendee', (req, res) => {
  const { userId, yelpId } = req.body;
  Venue.find({ yelpId }, (err, venues) => {
    if (venues.length === 0) {
      Venue.create({ yelpId, attendees: [userId] }, () => {
        res.send({ type: 'new venue', yelpId, userId });
      });
    } else {
      if (venues[0].attendees.find(user => user === userId)) {
        return res.send({ error: true, description: 'You are already signed up for this location' });
      }
      venues[0].attendees.push(userId);
      venues[0].save(() => {
        res.send({ yelpId, userId });
      });
    }
  });
});

app.delete('/venues/remove-attendee', (req, res) => {
  console.log(req.body)
  const { userId, yelpId } = req.body;
  Venue.find({ yelpId }, (err, venues) => {
    const filtered = venues[0].attendees.filter(id => id !== userId);
    if (!filtered.length) {
      Venue.remove({ yelpId }, () => {
        res.send({ type: 'remove venue', userId, yelpId });
      });
    } else {
      venues[0].attendees = filtered;
      venues[0].save(() => {
        res.send({ userId, yelpId });
      });
    }
  });
});

app.post('/venues/search/:location', (req, res) => {
  fetch(`https://api.yelp.com/v3/businesses/search?term=bar&location=${req.params.location}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${process.env.YELP_TOKEN}`,
    },
  })
  .then(json => json.json())
  .then(response => res.send(response));
});

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
