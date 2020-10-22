import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { getUserListing } from '../../ducks/listReducer'

// FaSwimmingPool
// FiWind
// CgSmartHomeWashMachine
// FaWifi
// MdLocalParking
// MdSatellite
// RiTempColdLine

class Amenities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amenities: []
    }
  }

  getListing = () => {
    axios.get('/api/listing/getlistings').then((res) => {
      this.setState({
        amenities: res.data,
      })
    })
  }

  render() {
    console.log(this.props.listReducer.listing.amenities)
    return (

      <div>
        <h1>Amenities</h1>
        <p></p>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserListing })(Amenities)