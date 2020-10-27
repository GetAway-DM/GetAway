import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends React.Component {

    state = {
        showingInfoWindow: true,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    //           var geocoderFunction = function () { 
    //         geocoder.geocode({ 'address': road[index] }, 
    //            function (results, status) {
    //               if (status == google.maps.GeocoderStatus.OK) {
    //                  new google.maps.Marker({
    //                     map: map, 
    //                     position: results[0].geometry.location
    //                  });
    //            }             
    //    }

    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAidj2vQaxHLAtybTybhIAZi6bnUm7fGkE"
})(MapContainer)