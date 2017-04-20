import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (!user) res.send({ name: 'Error', message: 'Invalid username or password' });
    else {
      req.logIn(user, () => {
        const credentials = { username: user.username, _id: user._id };
        res.send({ success: true, credentials });
      });
    }
  })(req, res);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.end();
});

export default router;
