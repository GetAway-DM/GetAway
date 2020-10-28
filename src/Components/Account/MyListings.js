import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { FaSwimmingPool, FaWifi, FaParking } from 'react-icons/fa'
import { CgSmartHomeWashMachine } from "react-icons/cg"
import { FiWind } from "react-icons/fi"
import { RiTempColdLine } from "react-icons/ri"
import { CgScreen } from "react-icons/cg"
import AddPhoto from './AddPhoto'
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
            amenities_id: 0,
            parking: false,
            television: false,
            washer_dryer: false,
            air_conditioning: false,
            wifi: false,
            hair_dryer: false,
            pool: false,
            photos: [],
            detailsEdit: false,
            amenitiesEdit: false,
            photosEdit: false,
            uploadedPhoto: [],
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
            const {amenities_id, parking, television, washer_dryer, air_conditioning, wifi, hair_dryer, pool} = res.data
            this.setState({
                amenities_id,
                parking,
                television,
                washer_dryer,
                air_conditioning,
                wifi,
                hair_dryer,
                pool,
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
      handleChecked = (e) => {
        this.setState({
          [e.target.id]: e.target.checked,
        })
      }
      addPhoto = (newPhoto) => {
        this.setState({
          uploadedPhoto: [...this.state.uploadedPhoto, newPhoto],
        })
      }
      handleDetails = (e) => {
          e.preventDefault()
          const { listing_id, title, description, bedrooms, bathrooms, price, street, city, state, zip} = this.state
          axios.put('/api/listing/editlistingdetails', { listing_id, title, description, bedrooms, bathrooms, price, street, city, state, zip}).then(window.location.reload())
      }
      handleAmenities = (e) => {
        e.preventDefault()
        const { amenities_id, parking, television, washer_dryer, air_conditioning, wifi, hair_dryer, pool} = this.state
        axios.put('/api/listing/editlistingamenities', { amenities_id, parking, television, washer_dryer, air_conditioning, wifi, hair_dryer, pool}).then(window.location.reload())
    }
    handlePhotos = (e) => {
        const {listing_id} = this.props.listing
        const uploadedPhoto = this.state.uploadedPhoto
        axios.post(`/api/listingphoto/uploadphoto/${listing_id}`, {uploadedPhoto}).then(window.location.reload())
    }

    deleteListing = () => {
        axios.delete(`/api/listing/deletelisting/${this.state.listing.listing_id}`).then(window.location.reload())
    }

    render(props){
        
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
          {this.state.amenitiesEdit === false ? (
            <div>
              {this.state.parking === true ? (
                  <p value={this.state.parking}> <FaParking /> Parking</p>
                  ) : null}
              {this.state.television ? (
                  <p value={this.state.television}> <CgScreen /> Television</p>
                  ) : null}
              {this.state.washer_dryer ? (
                  <p value={this.state.washer_dryer}> <CgSmartHomeWashMachine /> Washer/Dryer</p>
                  ) : null}
              {this.state.air_conditioning ? (
                  <p value={this.state.air_conditioning}> <RiTempColdLine /> Air Conditioning</p>
                  ) : null}
              {this.state.wifi ? (
                  <p value={this.state.wifi}> <FaWifi /> Wifi</p>
                  ) : null}
              {this.state.hair_dryer ? (
                  <p value={this.state.hair_dryer}> <FiWind /> Hair Dryer</p>
                  ) : null}
              {this.state.pool ? (
                  <p value={this.state.pool}> <FaSwimmingPool /> Pool</p>
                  ) : null}
            <button name="amenitiesEdit" onClick={(e) => {this.toggleEdit(e)}}>Edit Amenities</button>
                </div>)
                : (<div>
                    <label>Parking:</label>
                        <input
                          type="checkbox"
                          id="parking"
                          name="amenities"
                          value="parking"
                          onChange={this.handleChecked}
                          checked={this.state.parking}
                        />
                        <label>Television:</label>
                        <input
                          type="checkbox"
                          id="television"
                          name="amenities"
                          value="television"
                          onChange={this.handleChecked}
                          checked={this.state.television}
                        />
                        <label>Washer/Dryer:</label>
                        <input
                          type="checkbox"
                          id="washer_dryer"
                          name="amenities"
                          value="washer_dryer"
                          onChange={this.handleChecked}
                          checked={this.state.washer_dryer}
                        />
                        <label>Air Conditioning:</label>
                        <input
                          type="checkbox"
                          id="air_conditioning"
                          name="Amenities"
                          value="air_conditioning"
                          onChange={this.handleChecked}
                          checked={this.state.air_conditioning}
                        />
                        <label>Wifi:</label>
                        <input
                          type="checkbox"
                          id="wifi"
                          name="amenities"
                          value="wifi"
                          onChange={this.handleChecked}
                          checked={this.state.wifi}
                        />
                        <label>Hair Dryer:</label>
                        <input
                          type="checkbox"
                          id="hair_dryer"
                          name="amenities"
                          value="hair_dryer"
                          onChange={this.handleChecked}
                          checked={this.state.hair_dryer}
                        />
                        <label>Pool:</label>
                        <input
                          type="checkbox"
                          id="pool"
                          name="amenities"
                          value="pool"
                          onChange={this.handleChecked}
                          checked={this.state.pool}
                        />
                    <button onClick={(e) => {this.handleAmenities(e)}}>Submit Amenities</button>
                    <button name="amenitiesEdit" onClick={(e) => {this.toggleCancel(e)}}>Cancel Amenities Edit</button>
                </div>)}
        </> {this.state.photosEdit === false ?
            (<div>
                <Photo photos={this.state.photos}/>
            <button name="photosEdit" onClick={(e) => {this.toggleEdit(e)}}>Add Photos</button>
            </div>) :
            (<div>
                <AddPhoto addPhoto={this.addPhoto} uploadPhoto={this.state.uploadedPhoto}/>
                <button onClick={(e) => {this.handlePhotos(e)}}>Submit Photos</button>
                <button name="photosEdit" onClick={(e) => {this.toggleCancel(e)}}>Cancel Adding Photos</button>
            </div>)}
        <button onClick={(e) => {this.props.push(`/listing/${this.state.listing_id}`)}}>Go To Listing</button>
        <button onClick={(e) => {this.deleteListing()}}>Delete Listing</button>
            </div>
        )
    }
    
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(MyListings)