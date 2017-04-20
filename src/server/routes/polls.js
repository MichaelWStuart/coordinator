import { Router } from 'express';
import Poll from '../models/poll';

import { normalizePoll } from '../helpers/polls';

const router = Router();

router.post('/new', (req, res) => {
  const { title, _options } = req.body;
  const _authorId = req.user._id;
  Poll.create({ title, _options, _authorId }, (err, resPoll) => res.send(normalizePoll(resPoll)));
});

router.put('/:_id/vote', (req, res) => {
  const _id = req.params._id;
  const { optionId, voterId } = req.body;
  Poll.findById(_id, (findErr, poll) => {
    const optionIndex = poll._options.findIndex(option => option._id.toString() === optionId);
    const duplicateUser = poll._options[optionIndex].votes.indexOf(voterId) >= 0;
    if (duplicateUser) {
      res.send({ success: false, message: 'You have already voted on this poll' });
    } else {
      poll._options.forEach(option => option.votes = option.votes.filter(voter => voter !== voterId));
      poll._options[optionIndex].votes.push(voterId);
      poll.save((saveErr, resPoll) => res.send({ success: true, resPoll: normalizePoll(resPoll) }));
    }
  });
});

router.put('/:_id', (req, res) => {
  const _id = req.params._id;
  Poll.findById(_id, (findErr, poll) => {
    poll._options = req.body;
    poll.save((saveErr, resPoll) => res.send(normalizePoll(resPoll)));
  });
});

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  Poll.findByIdAndRemove(_id, () => res.end());
});

export default router;
