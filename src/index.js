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
    this.renderMap(this.props.address);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address != nextProps.address) {
      this.renderMap(nextProps.address);
    }
  }

  getMarker(position, icon) {
    return new window.google.maps.Marker({ position, icon });
  }

  handleResults(results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      this.setState({ isGeocodingError: false });

      if (!this.map) {
        const options = Object.assign({ center: results[0].geometry.location }, this.props.options)
        this.map = new window.google.maps.Map(this.mapElement, options );
        if(this.props.options.showMarker ) {          
          this.marker = this.getMarker(results[0].geometry.location, this.props.options.markerIcon);
          this.marker.setMap(this.map);
        }
      } else {
        this.map.setCenter(results[0].geometry.location);
        if(results[0].formatted_address.split(',').length > 2) {
            this.map.setZoom(9);
        } else {
            this.map.setZoom(6);
        }
        if(this.props.options.showMarker ) {
          this.marker.setMap(null);
          this.marker = this.getMarker(results[0].geometry.location, this.props.options.markerIcon);
          this.marker.setMap(this.map);
        }        
      }

      return;
    }

    this.setState({ isGeocodingError: true });
  }

  renderMap(address) {
    this.geocoder.geocode({ address: address }, this.handleResults.bind(this));
  }

  render() {
    this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>;
    return (
      <div className="map" ref={c => (this.mapElement = c)} style={{ height: '100%' }} />
    );
  }
}

MyComponent.propTypes = {
  address: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default MyComponent;
