import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MyMarker from './MyMarker'
import { GiHouse } from 'react-icons/gi'
// import { setApiKey } from 'react-geocode'
import axios from 'axios'
import './dashboard.css'
import { TextsmsTwoTone } from '@material-ui/icons'

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

  // locations = [
  // {
  // 	title: 'House',
  // 	position: {lat: 48.856259, lng: 2.365043},
  // 	icon: {
  // 		url: "images/markers/svg/Coffee_3.svg",
  // 		scaledSize: new google.maps.Size(64, 64)
  // 	}
  // },

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
    }
  }

  // addMarker = () => {}

  //  TODO: map over array of markers the pass down for each marker individual
  //  ? Can we invoke putOnMarkers() in the getAddress function and so on?
  //  ? How to correctly access lat lng from our axios request to display the markers?

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
        // <Marker
        //   key={i}
        //   id={i}
        //   position={{
        //     lat: el.geometry.location.lat,
        //     lng: el.geometry.location.lng,
        //   }}
        // />
      )
    })

    console.log(markerz)
    return (
      <div className="mapContainer">
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
