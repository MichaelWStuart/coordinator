import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import addAttendee from '../actions/async-creators/add-attendee';
import logout from '../actions/async-creators/logout';
import search from '../actions/async-creators/search';
import error from '../actions/sync-creators/error';
import populate from '../actions/sync-creators/search';
import Stars from './stars';
import AttendButton from './attend';

const getAttendees = (allVenues, currentVenue) => {
  const activeVenue = allVenues.find(venue => venue.yelpId === currentVenue.id);
  return activeVenue ? activeVenue.attendees : [];
};

const hoverText = (attendees, userId) => attendees.length && (attendees.indexOf(userId) !== -1) ? 'Cancel' : 'Attend';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleErrorClear = this.handleErrorClear.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

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

  handleErrorClear() {
    this.input.value = '';
    this.props.clearError();
  }

  handleLoginClick() {
    window.localStorage.setItem('_search_results', JSON.stringify(this.props.searchResults));
    window.location = '/auth/facebook';
  }

  render() {
    return (
      <div>
        {this.props.error &&
          <div>
            <div className="flash-error-box">{this.props.error}</div>
            <button className="delete-button" onMouseUp={this.handleErrorClear}>X</button>
          </div>}
        <div id="facebook-login" style={{ top: `${this.props.error ? 38 : 5}px` }}>
          <img id="icon" alt="facebook-icon" src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png" />
          {this.props.userId ? (
            <p className="text" onClick={this.props.handleLogoutClick}>Logout</p>
          ) : (
            <p className="text" onClick={this.handleLoginClick}>Login with facebook</p>
          )}
        </div>
        <h1 id="app-title">Placeholder Title</h1>
        <p id="title-subtext">Sign up, Meet up, Drink up</p>
        <svg id="cocktail-icon" width="18px" height="18px" viewBox="0 0 37.372 37.372" fill="#AAA">
          <path d="M33.367,9.246c0.281-0.294,0.36-0.728,0.2-1.101c-0.16-0.374-0.528-0.617-0.934-0.617h-7.734l1.176-2.521   c1.122,0.354,2.327-0.1,2.804-1.119c0.475-1.019,0.048-2.233-0.944-2.866l0.252-0.54c0.079-0.17,0.006-0.371-0.164-0.45   c-0.17-0.079-0.371-0.006-0.45,0.164l-0.252,0.54c-1.123-0.354-2.327,0.1-2.803,1.119s-0.048,2.233,0.944,2.866l-1.311,2.806H4.737   c-0.407,0-0.774,0.243-0.934,0.617c-0.16,0.374-0.081,0.808,0.2,1.101l13.755,14.371v11.978h-3.821   c-0.491,0-0.889,0.398-0.889,0.889c0,0.491,0.397,0.89,0.889,0.89h9.497c0.491,0,0.889-0.398,0.889-0.89   c0-0.49-0.397-0.889-0.889-0.889h-3.822V23.617L33.367,9.246z M23.203,9.56l-1.315,2.821H11.303l7.383,7.713l7.383-7.713h-3.433   l1.315-2.821h6.303L18.686,21.646L7.116,9.56H23.203z" />
        </svg>
        <form id="search-bar" onSubmit={this.props.handleSubmit}>
          <input ref={input => this.input = input} id="search-input" placeholder="enter a location..." name="input" />
          <button id="search-button">Search</button>
        </form>
        {this.props.searchResults.businesses &&
          <ul id="listings">
            {this.props.searchResults.businesses.map(venue =>
              <li className="listing" key={venue.id}>
                <img className="thumbnail" src={venue.image_url} alt={venue.id} onClick={() => window.open(venue.url)} />
                <div className="info-box">
                  <h2 className="venue-title">{venue.name}</h2>
                  <div className="venue-price">
                    <p className="text">price: </p>
                    <p className="dollar-signs">{venue.price}</p>
                  </div>
                  <Stars venueId={venue.id} rating={venue.rating} />
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
  error: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  venues: PropTypes.array.isRequired,
  attendVenue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  handleLogoutClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  populateSearchResults: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
  searchResults: state.search,
  userId: state.user.profileId,
  venues: state.venues,
});

const mapDispatchToProps = dispatch => ({
  attendVenue: (userId, yelpId) => dispatch(addAttendee({ userId, yelpId })),
  clearError: () => dispatch(error('')),
  handleLogoutClick: () => dispatch(logout()),
  handleSubmit: (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.input.value;
    inputValue && dispatch(search(inputValue));
  },
  populateSearchResults: searchResults => dispatch(populate(searchResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
