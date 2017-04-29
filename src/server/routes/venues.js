import { Router } from 'express';
import fetch from 'isomorphic-fetch';

import Venue from '../models/venue';

const router = Router();

router.post('/add-attendee', (req, res) => {
  const { userId, yelpId } = req.body;
  Venue.findOne({ yelpId }, (err, venue) => {
    if (!venue) {
      Venue.create({ yelpId, attendees: [userId] }, () => {
        res.send({ type: 'new venue', yelpId, userId });
      });
    } else if (venue.attendees.find(user => user === userId)) {
      res.send({ error: true, description: 'You are already signed up for this location' });
    } else {
      venue.attendees.push(userId);
      venue.save(() => res.json({ yelpId, userId }));
    }
  });
});

router.delete('/remove-attendee', (req, res) => {
  const { userId, yelpId } = req.body;
  Venue.findOne({ yelpId }, (err, venue) => {
    const filtered = venue.attendees.filter(id => id !== userId);
    if (!filtered.length) {
      Venue.remove({ yelpId }, () => {
        res.send({ type: 'remove venue', userId, yelpId });
      });
    } else {
      venue.attendees = filtered;
      venue.save(() => {
        res.send({ userId, yelpId });
      });
    }
  });
});

router.post('/search/:location', (req, res) => {
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

export default router;
