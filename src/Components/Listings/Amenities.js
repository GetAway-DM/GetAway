import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getUserListing } from '../../ducks/listReducer'
import { FaSwimmingPool, FaWifi, FaParking } from 'react-icons/fa'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { FiWind } from 'react-icons/fi'
import { RiTempColdLine } from 'react-icons/ri'
import { CgScreen } from 'react-icons/cg'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import './amenities.css'

class Amenities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amenities: [],
    }
  }

  async componentDidMount() {
    await this.getListing()
  }
  getListing = () => {
    axios.get(`/api/listing/getlistings/${this.props.listing}`).then((res) => {
      this.setState({
        amenities: res.data,
      })
    })
  }

  render() {
    let amenitiesDisplay = 'Loading'

    if (this.props.listReducer.listing.amenities) {
      const amenities = { ...this.props.listReducer.listing.amenities }

      amenitiesDisplay = (
        <Container
          className="a-box-all"
          style={{
            position: 'relative',
            top: '-10rem',
            display: 'inlineBlock',
          }}>
          <h3>Amenities</h3>

          {amenities.parking === true ? (
            <p value="parking">
              {' '}
              <FaParking /> Parking
            </p>
          ) : null}
          {amenities.television ? (
            <p value="television">
              {' '}
              <CgScreen /> Television
            </p>
          ) : null}
          {amenities.washer_dryer ? (
            <p value="washer_dryer">
              {' '}
              <CgSmartHomeWashMachine /> Washer/Dryer
            </p>
          ) : null}
          {amenities.air_conditioning ? (
            <p value="air_conditioning">
              {' '}
              <RiTempColdLine /> Air Conditioning
            </p>
          ) : null}
          {amenities.wifi ? (
            <p value="wifi">
              {' '}
              <FaWifi /> Wifi
            </p>
          ) : null}
          {amenities.hair_dryer ? (
            <p value="hair_dryer">
              {' '}
              <FiWind /> Hair Dryer
            </p>
          ) : null}
          {amenities.pool ? (
            <p value="pool">
              {' '}
              <FaSwimmingPool /> Pool
            </p>
          ) : null}
        </Container>
      )
    }
    // const { amenities } = this.props.listReducer.listing

    return <div>{amenitiesDisplay}</div>
  }
}
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserListing })(Amenities)
