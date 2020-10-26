import React, { Component } from 'react'
import axios from 'axios'
import { setApiKey } from 'react-geocode'

const { GM_API_KEY } = process.env

class Request extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: [],
      street: '',
      city: '',
      state: '',
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
    const newState = axios
      .get('/api/map/location/getstate')
      .then((res) => this.setState({ state: res.data }))
  }

  putOnMarkers = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.newStreet},${this.newCity},${this.newState}&key=AIzaSyAIzMnQ39LrIcPpcAMbbNhOdn7cjZy_0Vc`
      )
      .then((res) => this.setState({ marker: res.data.results }))
      .catch((err) => console.log('err'))
  }

  render() {
    return (
      <div>
        <p>stuff</p>
      </div>
    )
  }
}
export default Request
