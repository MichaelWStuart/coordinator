import { Router } from 'express';
import passport from 'passport';
import User from '../models/user';

const router = Router();

router.post('/register', (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  User.register(newUser, req.body.password, (err, user) => {
    if (!user) res.send(err);
    else {
      const credentials = { username, _id: user._id };
      passport.authenticate('local')(req, res, () => {
        res.send({ success: true, credentials });
      });
    }
  });
});

export default router;
