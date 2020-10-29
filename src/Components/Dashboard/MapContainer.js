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
      const street = await axios.get('/api/map/location/getstreet')
      const city = await axios.get('/api/map/location/getcity')
      const state = await axios.get('/api/map/location/getstate')
      this.setState({
        street: street.data,
        city: city.data,
        state: state.data,
      })
    } catch (error) {
      console.log('error in async')
    } finally {
      this.putOnMarkers()
    }
  }

  putOnMarkers() {
    const { GM_API_KEY } = config
    const { state, city, street } = this.state
    for (let i = 0; i < street.length; i++) {
      axios
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
            key: GM_API_KEY,
            language: 'en',
            region: 'US',
          }}
          defaultCenter={this.props.locationReducer.selectedProperty}
          defaultZoom={12}>
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
