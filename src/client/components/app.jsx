import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import search from '../actions/async-creators/search';
import AttendButton from './attend-button';
import addAttendee from '../actions/async-creators/add-attendee';
import populate from '../actions/sync-creators/search';

const getAttendees = (allVenues, currentVenue) => {
  const activeVenue = allVenues.find(venue => venue.yelpId === currentVenue.id);
  return activeVenue ? activeVenue.attendees : [];
};

const hoverText = (attendees, userId) => attendees.length && (attendees.indexOf(userId) !== -1) ? 'Cancel' : 'Attend';

class App extends React.Component {

  componentWillMount() {
    const venueId = document.cookie.slice(13);
    const searchResults = JSON.parse(window.localStorage.getItem('_search_results') || null);
    if (this.props.userId && venueId && (venueId !== 'undefined')) {
      document.cookie = 'currentVenue=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.props.attendVenue(this.props.userId, venueId);
    }
    window.localStorage.setItem('_search_results', '');
    searchResults && this.props.populateSearchResults(searchResults);
  }

  render() {
    return (
      <div>
        <form id="search-bar" onSubmit={this.props.handleSubmit}>
          <input id="search-input" placeholder="enter a location..." name="input" />
          <button id="search-button">Search</button>
        </form>
        {this.props.searchResults.businesses &&
          <ul id="listings">
            {this.props.searchResults.businesses.map(venue =>
              <li className="listing" key={venue.id}>
                <img className="thumbnail" src={venue.image_url} alt={venue.id} onClick={() => window.open(venue.url)} />
                <div className="info-box">
                  <h2 className="venue-title">{venue.name}</h2>
                  <p className="venue-price">{`price: ${venue.price}`}</p>
                  <p className="venue-rating">{`rating: ${venue.rating}`}</p>
                </div>
                <AttendButton
                  venueId={venue.id}
                  attendees={getAttendees(this.props.venues, venue)}
                  hoverText={hoverText(getAttendees(this.props.venues, venue), this.props.userId)}
                />
              </li>,
            )}
          </ul>}
      </div>
    );
  }
}

App.propTypes = {
  populateSearchResults: PropTypes.func.isRequired,
  attendVenue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  searchResults: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  venues: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  searchResults: state.search,
  error: state.error,
  userId: state.user.profileId,
  venues: state.venues,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (event) => {
    event.preventDefault();
    dispatch(search(event.target.elements.input.value));
  },
  attendVenue: (userId, yelpId) => dispatch(addAttendee({ userId, yelpId })),
  populateSearchResults: searchResults => dispatch(populate(searchResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
