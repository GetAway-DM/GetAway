import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

  render() {
    const mapAmenities = this.state.amenities.map((amenity) => {
      return (
        <div></div>
      )
    }
    )
    return (
      <div>{mapAmenities}</div>
    )

  }
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUserListing }(Amenities))