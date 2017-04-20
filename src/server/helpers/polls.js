export const normalizePoll = (poll) => {
  poll = poll.toObject();
  poll.totalVotes = 0;
  poll._options.forEach((option) => {
    option.votes = option.votes.length;
    poll.totalVotes += option.votes;
  });
  return poll;
};

export const normalizePolls = polls => polls.map(normalizePoll);
