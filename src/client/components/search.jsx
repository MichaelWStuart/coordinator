import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import search from '../actions/async-creators/search';
import AttendButton from './attendButton';

const Search = props =>
  <div id="search-page">
    {props.error &&
      <p className="flash-error-box">{props.error}</p>}
    <form onSubmit={props.handleSubmit}>
      <input id="search-input" placeholder="enter a location..." name="input" />
      <button id="search-button">Search</button>
    </form>
    {props.searchResults.businesses &&
      <ul id="listings">
        {props.searchResults.businesses.map(venue =>
          <li className="listing" key={venue.id}>
            <img className="thumbnail" src={venue.image_url} alt={venue.id} onClick={() => window.open(venue.url)} />
            <div className="info-box">
              <h2 className="venue-title">{venue.name}</h2>
              <p className="venue-price">{`price: ${venue.price}`}</p>
              <p className="venue-rating">{`rating: ${venue.rating}`}</p>
            </div>
            <AttendButton venue={props.venues.find(dbVenue => venue.id === dbVenue.yelpId) || {}} />
          </li>,
        )}
      </ul>}
  </div>;

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  searchResults: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  venues: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  searchResults: state.search,
  error: state.error,
  venues: state.venues,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (event) => {
    event.preventDefault();
    dispatch(search(event.target.elements.input.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
