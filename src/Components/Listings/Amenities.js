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
    console.log(this.props)
    const mapAmenities = this.state.amenities.map((amenities) => {
      return (

        <div>
          {this.props.listReducer.listings.pool === true ? <p>Pool</p> : null
          }



        </div>
      )
    }
    )
    return (
      <div>
        <div></div>


        <p>{mapAmenities}</p>
      </div>

    )

  }
}
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserListing })(Amenities)