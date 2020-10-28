import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'
import React, { Component } from 'react'
import CreateCarousel from './CreateCarousel'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  palette: {
      primary: blueGrey,
  },
})
class CreateListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      property_type: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
      street: '',
      city: '',
      state: '',
      zip: 0,
      parking: false,
      television: false,
      washer_dryer: false,
      air_conditioning: false,
      wifi: false,
      hair_dryer: false,
      pool: false,
      uploadedPhoto: [],
    }
  }
  async componentDidMount() {
    if (!this.props.authReducer.isLoggedIn) {
      this.props.getUser().catch((err) => {
        this.props.history.push('/')
      })
    }
    this.props.getUser()
  }
  //must pull user_id from reducer from here.
  // app.post('/api/listing/newlisting', verifyUser,  listCtrl.addListing)
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      title,
      description,
      property_type,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool,
      uploadedPhoto,
    } = this.state
    const { user_id } = this.props.authReducer.user

    axios
      .post('/api/listing/newlisting', {
        title,
        description,
        user_id,
        property_type,
        bedrooms,
        bathrooms,
        price,
        street,
        city,
        state,
        zip,
        parking,
        television,
        washer_dryer,
        air_conditioning,
        wifi,
        hair_dryer,
        pool,
        uploadedPhoto,
      })
      .then((res) => {
        const listing_id = res.data.listing_id
        this.props.history.push(`/listing/${listing_id}`)
        return listing_id
      })
      .catch((err) => {
        alert('New Listing Error')
      })
  }

  addPhoto = (newPhoto) => {
    this.setState({
      uploadedPhoto: [...this.state.uploadedPhoto, newPhoto],
    })
  }

  handleChecked = (e) => {
    this.setState({
      [e.target.id]: e.target.checked,
    })
  }

  handleUserChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleCancel = (e) => {
    this.props.history.push(`/`)
  }
  render() {
    return (
      <div>
        <div>New Listing</div>
        <form id="create_listing" onSubmit={this.handleSubmit.bind(this)} method="Post">
        <TextField
          variant="outlined"
          label="Title"
          id="title"
          name="title" 
          type="text" 
          onChange={(e) => this.handleUserChange(e)}/>
        <TextField
          variant="outlined"
          label="Description"
          id="description"
          name="description" type="text" 
          onChange={(e) => this.handleUserChange(e)}/>
          <label>Property Type:</label>
          <select name="property_type" value={this.state.property_type} onChange={(e) => this.handleUserChange(e)}>
            <option value="Select Property Type"></option>
            <option value="1">House</option>
            <option value="2">Apartment</option>
          </select>

          <label>Bedrooms:</label>
          <select name="bedrooms" value={this.state.bedrooms} onChange={(e) => this.handleUserChange(e)}>
            <option value="Number of Bedrooms"></option>
            <option value="1">1 bedroom</option>
            <option value="2">2 bedrooms</option>
            <option value="3">3 bedrooms</option>
            <option value="4">4 bedrooms</option>
            <option value="5">5 bedrooms</option>
            <option value="6">6 bedrooms</option>
          </select>

          <label>Bathrooms:</label>
          <select name="bathrooms" value={this.state.bathrooms} onChange={(e) => this.handleUserChange(e)}>
            <option value="Number of Bathrooms"></option>
            <option value="1">1 bathroom</option>
            <option value="2">2 bathrooms</option>
            <option value="3">3 bathrooms</option>
            <option value="4">4 bathrooms</option>
            <option value="5">5 bathrooms</option>
            <option value="6">6 bathrooms</option>
          </select>
          <TextField
          variant="outlined"
          label="Price"
          id="price"
          name="price" type="numeric" onChange={(e) => this.handleUserChange(e)}/>
          <TextField
          variant="outlined"
          label="Street"
          id="street"
          name="street" type="text" placeholder="Street" onChange={(e) => this.handleUserChange(e)}/>
          <TextField
          variant="outlined"
          label="City"
          id="city"
          name="city" type="text" placeholder="City" onChange={(e) => this.handleUserChange(e)}/>
          <TextField
          variant="outlined"
          label="State"
          id="state"
          name="state" type="text" placeholder="State" onChange={(e) => this.handleUserChange(e)}/>
          <TextField
          variant="outlined"
          label="Zip"
          id="zip"
          name="zip" type="integer" placeholder="Zip" onChange={(e) => this.handleUserChange(e)}/>
          <div>Amenities</div>
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

          <CreateCarousel addPhoto={this.addPhoto} uploadPhoto={this.state.uploadedPhoto} />

          <div>
          <MuiThemeProvider theme={theme}><Button
            variant="contained"
            color='primary'
            type="submit" onClick={this.handleSubmit}>
              Create
          </Button></MuiThemeProvider>
            <MuiThemeProvider theme={theme}><Button
                  variant="contained"
                  color='primary'
                  onClick={(e) => {
                    this.handleCancel(e)
                  }}>
                  Cancel
                </Button></MuiThemeProvider>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => state

export default connect(mapStateToProps, { getUser })(CreateListing)
