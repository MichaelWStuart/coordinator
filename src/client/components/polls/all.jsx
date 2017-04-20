import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AllPolls = props =>
  <div id="all-polls-page">
    <h1 id="all-polls-title">Vote-App</h1>
    <p id="all-polls-caption">View polls / register to Create or Vote:</p>
    <ul id="all-polls-list">
      {props.polls.map(poll =>
        <NavLink className="all-polls-link" key={poll._id} to={`/polls/${poll._id}`}>
          <li className="all-polls-poll">{poll.title}</li>
        </NavLink>,
      )}
    </ul>
    {props.user &&
      <NavLink to={'/polls/create'}>
        <button className="standard-button" id="all-polls-button">Create Poll</button>
      </NavLink>}
  </div>;

AllPolls.propTypes = {
  polls: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  polls: state.polls,
  user: state.user.username,
});

export default connect(mapStateToProps)(AllPolls);
