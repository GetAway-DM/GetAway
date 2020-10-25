import React, { Component } from 'react'
import Geocode from 'react-geocode'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},
    }
  }

  // // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  // Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

  // // set response language. Defaults to english.
  // Geocode.setLanguage("en");

  // // set response region. Its optional.
  // // A Geocoding request with region=es (Spain) will return the Spanish city.
  // Geocode.setRegion("es");

  // // Enable or disable logs. Its optional.
  // Geocode.enableDebug();

  // // Get address from latitude & longitude.
  // Geocode.fromLatLng("48.8583701", "2.2922926").then(
  //   response => {
  //     const address = response.results[0].formatted_address;
  //     console.log(address);
  //   },
  //   error => {
  //     console.error(error);
  //   }
  // );

  // // Get latitude & longitude from address.
  // Geocode.fromAddress("Eiffel Tower").then(
  //   response => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   error => {
  //     console.error(error);
  //   }
  // );

  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
// +Mountain+View,+CA&key=AIzaSyAidj2vQaxHLAtybTybhIAZi6bnUm7fGkE

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAidj2vQaxHLAtybTybhIAZi6bnUm7fGkE',
})(MapContainer)
