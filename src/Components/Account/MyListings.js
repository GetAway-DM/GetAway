import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { FaSwimmingPool, FaWifi, FaParking } from 'react-icons/fa'
import { CgSmartHomeWashMachine } from "react-icons/cg"
import { FiWind } from "react-icons/fi"
import { RiTempColdLine } from "react-icons/ri"
import { CgScreen } from "react-icons/cg"
import Photo from './Photo'

class MyListings extends Component{
    constructor(props){
        super(props)
        this.state = {
            listing: {},
            amenities: {},
            photos: [],
            detailsToggle: false,
            amenitiesToggle: false,
            photosToggle: false,
        }
    }
    async componentDidMount(){
        const {listing_id} = this.props.listing
        await this.setState({
            listing: this.props.listing
        })
        await axios.get(`/api/listing/amenities/${listing_id}`).then((res) => {
            this.setState({
                amenities: res.data
            })
        })
        await axios.get(`/api/listingphoto/getphotos/${listing_id}`).then((res) => {
            this.setState({
                photos: res.data
            })
        })
    }
    

    deleteListing = () => {
        axios.delete(`/api/listing/deletelisting/${this.state.listing.listing_id}`).then(window.location.reload())
    }

    render(props){
        const amenities = this.state.amenities
        const photos = this.state.photos
        const mappedPhotos = photos.map((photo, index) => {
            return (
                <Photo photo={photo} key={photo.id} />
            )
        })
        return(
            <div>
                <div>
                <h3>{this.state.listing.title}</h3>
                <p>{this.state.listing.description}</p>
                <p>Bedrooms: {this.state.listing.bedrooms}</p>
                <p>Bathrooms: {this.state.listing.bathrooms}</p>
                <p>Price: ${this.state.listing.price}</p>
                <p>Address:{this.state.listing.street}</p>
                <p>{this.state.listing.city}</p>
                <p>{this.state.listing.zip}</p>
                </div>
                <>
          <h4>Amenities</h4>

          {amenities.parking === true ? (
              <p value="parking"> <FaParking /> Parking</p>
              ) : null}
          {amenities.television ? (
              <p value="television"> <CgScreen /> Television</p>
              ) : null}
          {amenities.washer_dryer ? (
              <p value="washer_dryer"> <CgSmartHomeWashMachine /> Washer/Dryer</p>
              ) : null}
          {amenities.air_conditioning ? (
              <p value="air_conditioning"> <RiTempColdLine /> Air Conditioning</p>
              ) : null}
          {amenities.wifi ? (
              <p value="wifi"> <FaWifi /> Wifi</p>
              ) : null}
          {amenities.hair_dryer ? (
              <p value="hair_dryer"> <FiWind /> Hair Dryer</p>
              ) : null}
          {amenities.pool ? (
              <p value="pool"> <FaSwimmingPool /> Pool</p>
              ) : null}
        </>
        <div>{mappedPhotos}</div>
        <button onClick={(e) => {this.deleteListing()}}>Delete Listing</button>
            </div>
        )
    }
    
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(MyListings)