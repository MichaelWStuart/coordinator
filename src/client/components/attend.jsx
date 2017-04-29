import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import addAttendee from '../actions/async-creators/add-attendee';
import removeAttendee from '../actions/async-creators/remove-attendee';

class AttendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleAttendClick = this.handleAttendClick.bind(this);
  }

  handleAttendClick() {
    if (this.props.userId) {
      this.props.attendVenue(this.props.userId, this.props.venueId);
    } else {
      document.cookie = `currentVenue=${this.props.venueId}`;
      window.localStorage.setItem('_search_results', JSON.stringify(this.props.searchResults));
      window.location = '/auth/facebook';
    }
  }

  render() {
    return (
      <button
        onClick={this.props.hoverText === 'Attend' ? this.handleAttendClick : () => this.props.handleCancelClick(this.props.userId, this.props.venueId)}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        className="attend-button"
      >{this.state.hover ? this.props.hoverText : `${this.props.attendees.length} Going`}
      </button>
    );
  }
}

AttendButton.propTypes = {
  searchResults: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  attendVenue: PropTypes.func.isRequired,
  attendees: PropTypes.array.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  hoverText: PropTypes.string.isRequired,
  venueId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  searchResults: state.search,
  userId: state.user.profileId,
});

const mapDispatchToProps = dispatch => ({
  attendVenue: (userId, yelpId) => dispatch(addAttendee({ userId, yelpId })),
  handleCancelClick: (userId, yelpId) => dispatch(removeAttendee({ userId, yelpId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendButton);
