import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import removeAttendee from '../actions/async-creators/remove-attendee';

class AttendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleAttendClick = this.handleAttendClick.bind(this);
  }

  handleAttendClick() {
    document.cookie = `currentVenue=${this.props.venueId}`;
    window.localStorage.setItem('_search_results', JSON.stringify(this.props.searchResults));
    window.location = '/auth/facebook';
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
  userId: PropTypes.string.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  attendees: PropTypes.array.isRequired,
  venueId: PropTypes.string.isRequired,
  hoverText: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.profileId,
  searchResults: state.search,
});

const mapDispatchToProps = dispatch => ({
  handleCancelClick: (userId, yelpId) => dispatch(removeAttendee({ userId, yelpId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendButton);
