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
            title: '',
            description: '',
            bedrooms: 0,
            bathrooms: 0,
            price: 0,
            street: '',
            city: '',
            state: '',
            zip: 0,
            listing_id: 0,
            amenities: {},
            photos: [],
            detailsEdit: false,
            amenitiesEdit: false,
            photosEdit: false,
        }
    }
    async componentDidMount(){
        const {listing_id} = this.props.listing
        const {title, description, bedrooms, bathrooms, price, street, city, state, zip} = this.props.listing
        await this.setState({
            listing_id,
            title,
            description,
            bedrooms,
            bathrooms,
            price,
            street,
            city,
            state,
            zip
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
    handleInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })
      }
    
      toggleEdit = (e) => {
        this.setState({
          [e.target.name]: !this.state.value,
        })
      }
      toggleCancel = (e) => {
        this.setState({
          [e.target.name]: false,
        })
      }
      handleDetails = (e) => {
          e.preventDefault()
          const { listing_id, title, description, bedrooms, bathrooms, price, street, city, state, zip} = this.state
          axios.put('/api/listing/editlistingdetails', { listing_id, title, description, bedrooms, bathrooms, price, street, city, state, zip}).then(window.location.reload())
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
                {this.state.detailsEdit === false ? (
                <div>
                <h3>{this.state.title}</h3>
                <p>{this.state.description}</p>
                <p>Bedrooms: {this.state.bedrooms}</p>
                <p>Bathrooms: {this.state.bathrooms}</p>
                <p>Price: ${this.state.price}</p>
                <p>Address:{this.state.street}</p>
                <p>{this.state.city} {this.state.state}</p>
                <p>{this.state.zip}</p>
                <button name="detailsEdit" onClick={(e) => {this.toggleEdit(e)}}>Edit Details</button>
                </div>
                ) : (<div>
                    <label>Title: </label><input value={this.state.title} onChange={(e) => {this.handleInput(e)}} name="title" placeholder="Title" />
                    <label>Description: </label><input value={this.state.description} onChange={(e) => {this.handleInput(e)}} name="description" placeholder="Description"/>
                <label>Bedrooms: </label><input value={this.state.bedrooms} onChange={(e) => {this.handleInput(e)}} name="bedrooms" placeholder="Bedrooms" />
                <label>Bathrooms: </label><input value={this.state.bathrooms} onChange={(e) => {this.handleInput(e)}} name="bathrooms" placeholder="Bathrooms" />
                <label>Price: $</label><input value={this.state.price} onChange={(e) => {this.handleInput(e)}} name="price" placeholder="Price" />
                <label>Address:</label><input value={this.state.street} onChange={(e) => {this.handleInput(e)}} name="street" placeholder="Street" />
                <input value={this.state.city} onChange={(e) => {this.handleInput(e)}} name="city" placeholder="City" /> <input value={this.state.state} onChange={(e) => {this.handleInput(e)}} name="state" placeholder="State" />
                <input value={this.state.zip} onChange={(e) => {this.handleInput(e)}} name="zip" placeholder="Zip Code" />
                <button onClick={(e) => {this.handleDetails(e)}}>Submit Details</button>
                    <button name="detailsEdit" onClick={(e) => {this.toggleCancel(e)}}>Cancel Details Edit</button>
                </div>)}
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