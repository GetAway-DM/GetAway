import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MyMarker from './MyMarker'
import axios from 'axios'
import { connect } from 'react-redux'
import { getLocation } from '../../ducks/locationReducer'
import './dashboard.css'

const config = require('../.././config')

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: [],
      street: [],
      city: [],
      state: [],
      loading: true,
      locationProperty: {},
    }
  }

  componentDidMount() {
    this.getAddress()
  }

  async getAddress() {
    try {
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
    } catch (error) {
      console.log('error in async')
    } finally {
      await this.putOnMarkers()
    }
  }

  async putOnMarkers() {
    const { GM_API_KEY } = config
    const { state, city, street } = this.state
    for (let i = 0; i < street.length; i++) {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${street[i].street},${city[i].city},${state[i].state}&key=${GM_API_KEY}`
        )
        .then((res) => {
          this.setState({ marker: [...this.state.marker, res.data.results[0]] })
        })
        .catch((err) => console.log('err'))
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
          // defaultCenter={{ lat: 32.5893, lng: -92.023438 }}
          defaultCenter={this.props.locationReducer.selectedProperty}
          // defaultCenter={{this.props.getLocation.}}
          // onClick={this.props.handleInputProperty}
          // value="suggestion"
          defaultZoom={8}>
          {markerz}
        </GoogleMapReact>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getLocation })(MapContainer)
