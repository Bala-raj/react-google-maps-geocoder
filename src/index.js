// Demo component
// this is only example component

var INITIAL_MAP_ZOOM_LEVEL = 9;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};


import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {    
    constructor(props) {
        super(props);

        this.state = {
             isGeocodingError: false,             
        }
    }

    componentDidMount() {        
   
    this.geocoder = new window.google.maps.Geocoder();

    this.geocoder.geocode({ 'address': this.props.address }, function handleResults(results, status) {

      if (status === window.google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });
        
        new window.google.maps.Map(this.mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: results[0].geometry.location,
    });

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

    }.bind(this));
    }

   handleFormSubmit (submitEvent) {
    submitEvent.preventDefault();

    var address = this.searchInputElement.value;

    this.geocodeAddress(address);
  }


    geocodeAddress(address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === window.google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);       
        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    }.bind(this));
  }

    render() {
        this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>
        return (
            <div className="map" ref={(c) => (this.mapElement = c)} style={{height:"600px"}} /> 
        )
    }
}

MyComponent.propTypes = {
    address: PropTypes.string.isRequired,    
  }

export default MyComponent;
