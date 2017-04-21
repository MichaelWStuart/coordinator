import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import search from '../actions/async-creators/search';

const Home = props =>
  <div>
    <button onClick={props.handleClick}>Search</button>
    <p>{JSON.stringify(props.searchResults)}</p>
  </div>;

Home.propTypes = {
  handleClick: PropTypes.func.isRequired,
  searchResults: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchResults: state.search,
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch(search());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
