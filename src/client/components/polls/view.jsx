import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import vote from '../../actions/async-creators/polls/vote';
import destroy from '../../actions/async-creators/polls/destroy';
import error from '../../actions/sync-creators/error';

class ViewPoll extends React.Component {

  static voteWidth(option, totalVotes) {
    return option.votes ? `${(option.votes / totalVotes) * 100}%` : '0%';
  }

  componentWillMount() {
    !this.props.polls.find(item => item._id === this.props.match.params._id) && this.props.history.push('/polls');
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.polls.find(item => item._id === nextProps.match.params._id);
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  render() {
    const poll = this.props.polls.find(item => item._id === this.props.match.params._id);
    return (
      <div id="view-poll-page">
        {this.props.error &&
          <p className="flash-error-box">{this.props.error}</p>}
        <h1 id="view-poll-title">{poll.title}</h1>
        {poll._options.map((option, optionIndex) =>
          <div key={option._id}>
            <p className="view-poll-option-name">{option.name}</p>
            <div className="view-poll-vote-row">
              <div className="view-poll-data-placeholder">
                <div className="view-poll-data-container">
                  <div className="view-poll-data" style={{ width: ViewPoll.voteWidth(option, poll.totalVotes) }} />
                  <div className="view-poll-vote-number">votes: {option.votes}</div>
                </div>
              </div>
              {this.props.user.username &&
                <button
                  className="view-poll-vote-button"
                  onClick={() => this.props.handleVoteClick(poll, poll._options[optionIndex]._id, this.props.user._id)}
                >Vote</button>}
            </div>
          </div>,
        )}
        {poll._authorId === this.props.user._id &&
          <div id="view-poll-button-box">
            <NavLink to={`/polls/${this.props.match.params._id}/edit`}>
              <button className="left-button standard-button">Edit</button>
            </NavLink>
            <button className="right-button standard-button" onClick={(event) => { event.preventDefault(); this.props.handleDeleteClick(poll._id, this.props.history); }}>Delete</button>
          </div>}
      </div>
    );
  }
}

ViewPoll.propTypes = {
  handleVoteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  polls: state.polls,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  handleVoteClick: (poll, optionId, voterId) => {
    dispatch(vote(poll, optionId, voterId));
  },
  handleDeleteClick: (id, history) => dispatch(destroy(id, history)),
  clearError: () => dispatch(error('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
