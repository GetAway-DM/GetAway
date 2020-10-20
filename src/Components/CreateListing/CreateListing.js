import React, {Component} from 'react';

class CreateListing extends Component {
    constructor(){
        super()
        this.state={
            title: '',
            description: '',
            property_type: '',
            bedrooms: '',
            bathrooms: '',
            price: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            parking: false,
            television: false,
            washer_dryer: false,
            air_conditioning:false,
            wifi: false,
            hair_dryer: false,
            pool: false
        }
    }

// app.post('/api/listing/newlisting', verifyUser,  listCtrl.addListing)
    handleSubmit(e){
        e.preventDefault();

    }


    render(){
        return(
            <div>
                <div>New Listing</div>
                    <form id="create_listing" onSubmit={this.handleSubmit.bind(this)} method="Post">
                        
                        <label >Title:</label><input name="title" type="text"></input>

                        <label >Description:</label><input name="description" type="text"></input>

                        <label >Property Type:</label>
                        <select name="property_type" value={this.state.property_type} onChange={e => this.handleUserChange(e)}>
                            <option value="Select Property Type"></option>
                            <option value="1">House</option>
                            <option value="2">Apartment</option>
                            </select>

                        <label >Bedrooms:</label>
                        <select name="bedrooms" value={this.state.bedrooms} onChange={e => this.handleUserChange(e)}>
                            <option value="Number of Bedrooms"></option>
                            <option value="1">1 bedroom</option>
                            <option value="2">2 bedrooms</option>
                            <option value="3">3 bedrooms</option>
                            <option value="4">4 bedrooms</option>
                            <option value="5">5 bedrooms</option>
                            <option value="6">6 bedrooms</option>
                            </select>

                        <label >Bathrooms:</label>
                        <select name="bathrooms" value={this.state.bathrooms} onChange={e => this.handleUserChange(e)}>
                            <option value="Number of Bathrooms"></option>
                            <option value="1">1 bathroom</option>
                            <option value="2">2 bathrooms</option>
                            <option value="3">3 bathrooms</option>
                            <option value="4">4 bathrooms</option>
                            <option value="5">5 bathrooms</option>
                            <option value="6">6 bathrooms</option>
                            </select>
                            
                        <label>Price:</label>
                            <input name="price" type="numeric"></input>

                        <label>Address:</label>
                            <input name="street" type="text"></input>
                            <input name="city" type="text"></input>
                            <input name="state" type="text"></input>
                            <input name="zip" type="integer"></input>
                            
                        <div>Amenities</div>
                        <label>Parking:</label>
                            <input type="checkbox" id="Parking" name="Amenities" value="parking"/>
                        <label>Television:</label>
                            <input type="checkbox" id="Television" name="Amenities" value="television"/>
                        <label>Washer/Dryer:</label>
                            <input type="checkbox" id="washer_dryer" name="Amenities" value="washer_dryer"/>
                        <label>Air Conditioning:</label>
                            <input type="checkbox" id="air_conditioning" name="Amenities" value="air_conditioning"/>
                        <label>Wifi:</label>
                            <input type="checkbox" id="wifi" name="Amenities" value="wifi"/>
                        <label>Hair Dryer:</label>
                            <input type="checkbox" id="hair_dryer" name="Amenities" value="hair_dryer"/>
                        <label>Pool:</label>
                            <input type="checkbox" id="pool" name="Amenities" value="pool"/>

                        <button type="submit">Create</button>
                        <button onClick={(e)=> {this.handleCancel()}}>Cancel</button>
                    </form>

            </div>
        )
    }
}
export default CreateListing