import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MyMarker from './MyMarker'
import axios from 'axios'
import './dashboard.css'

const config = require('../.././config')

export default class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: [],
      street: [],
      city: [],
      state: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getAddress()
    this.putOnMarkers()
  }

  getAddress = () => {
    const newStreet = axios
      .get('/api/map/location/getstreet')
      .then((res) => this.setState({ street: res.data }))
    const newCity = axios
      .get('/api/map/location/getcity')
      .then((res) => this.setState({ city: res.data }))
    const newState = axios.get('/api/map/location/getstate').then((res) => {
      this.setState({ state: res.data })
      this.putOnMarkers()
    })
  }

  putOnMarkers = () => {
    const { GM_API_KEY } = config
    const { state, city, street } = this.state
    for (let i = 0; i < street.length; i++) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${street[i].street},${city[i].city},${state[i].state},&key=${GM_API_KEY}`
        )
        .then((res) => {
          this.setState({ marker: [...this.state.marker, res.data.results[0]] })
        })
        .catch((err) => console.log('err'))
      //     // <InfoWindow onClose={this.onInfoWindowClose}>
      //     //     <div>
      //     //         <h1>{this.state.selectedPlace.name}</h1>
      //     //     </div>
      //     // </InfoWindow>
      // </Map >
      // );
    }
  }

  render() {
    const { GM_API_KEY } = config
    const markerz = this.state.marker.map((el, i) => {
      console.log(el)
      return (
        <MyMarker
          key={i}
          lat={el.geometry.location.lat}
          lng={el.geometry.location.lng}
        />
      )
    })

    return (
      <div className="mappy">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAidj2vQaxHLAtybTybhIAZi6bnUm7fGkE',
            language: 'en',
            region: 'US',
          }}
          defaultCenter={{ lat: 38.8816, lng: -104.72396 }}
          defaultZoom={15}>
          {markerz}
        </GoogleMapReact>
      </div>
    )
  }
}
