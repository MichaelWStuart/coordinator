import React, { PropTypes } from 'react';

class Stars extends React.Component {

  stars() {
    const component = [];
    for (let i = 0; i < this.props.rating; i++) {
      component.push(
        <svg key={`${this.props.venueId}-${i}`} height="25" width="23" className="star" fill="#FCE750">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
        </svg>,
      );
    }
    return component;
  }

  render() {
    const nonFloat = this.props.rating % 1 === 0;
    return (
      <div className="star-box" style={{ width: `${this.props.rating * 30}px`, left: `${nonFloat ? 0 : 10}px` }}>
        {this.stars()}
        {!nonFloat &&
          <svg className="star-halfer" height="25" width="11.5" style={{ right: '13px' }}>
            <rect x="0" y="0" width="11.5" height="25" fill="#252525" />
          </svg>
        }
      </div>
    );
  }
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  venueId: PropTypes.string.isRequired,
};

export default Stars;
