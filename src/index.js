
const INITIAL_MAP_ZOOM_LEVEL = 9;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGeocodingError: false,
    };
  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder();
    this.renderMap();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address != nextProps.address) {
      this.renderMap();
    }
  }

  handleResults(results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      this.setState({ isGeocodingError: false });

      if (!this.map) {
        this.map = new window.google.maps.Map(this.mapElement, Object.assign({ center: results[0].geometry.location }, this.props.options));
      } else {
        this.map.setCenter(results[0].geometry.location);
      }

      return;
    }

    this.setState({ isGeocodingError: true });
  }

  renderMap() {
    this.geocoder.geocode({ address: this.props.address }, this.handleResults.bind(this));
  }

  render() {
    this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>;
    return (
      <div className="map" ref={c => (this.mapElement = c)} style={{ height: '600px' }} />
    );
  }
}

MyComponent.propTypes = {
  address: PropTypes.string.isRequired,
  options: PropTypes.object,
};

MyComponent.defaultProps = {
  options: {
    zoom: INITIAL_MAP_ZOOM_LEVEL,
  },
};

export default MyComponent;
