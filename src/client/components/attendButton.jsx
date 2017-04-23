import React, { PropTypes } from 'react';

export default class AttendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    return (
      <button
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        className="attend-button"
      >{this.state.hover ? 'Attend' : `${this.props.venue.attendees || 0} Going`}
      </button>
    );
  }
}

AttendButton.propTypes = {
  venue: PropTypes.object.isRequired,
};
