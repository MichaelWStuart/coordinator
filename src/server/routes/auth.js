import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('facebook'));

router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => req.login(null, () => res.redirect('/')));

router.get('/logout', (req, res) => {
  req.logout();
  res.end();
});

export default router;
