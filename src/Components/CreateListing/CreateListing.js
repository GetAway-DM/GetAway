import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'
import React, { Component } from 'react'
import CreateCarousel from './CreateCarousel'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './createlisting.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
      <div className="creates">
        <h3 className="header">New Listing</h3>
        <div className="thepage">
        <form id="create_listing" onSubmit={this.handleSubmit.bind(this)} method="Post">
        <div className="row">
          <span className="spaces">
            <TextField
              variant="outlined"
              label="Title"
              id="title"
              name="title" 
              type="text" 
              onChange={(e) => this.handleUserChange(e)}/>
          </span>
          <span className="spaces">
            <TextField
              variant="outlined"
              label="Description"
              id="description"
              name="description" type="text" 
              onChange={(e) => this.handleUserChange(e)}/>
          </span>
          <span className="spaces">
            <TextField
            variant="outlined"
            label="Price"
            id="price"
            name="price" type="numeric" onChange={(e) => this.handleUserChange(e)}/>
          </span>
        </div>
        <br className="spaces"></br>
      <div className="row">
        <span className="spaces">
          <FormControl variant="filled" className='dropdown'>
            <InputLabel id="property-type">Property Type</InputLabel>
            <Select
              labelId="property-type"
              id="dropdown"
    	        name="property_type"
              value={this.state.property_type}
              onChange={(e) => this.handleUserChange(e)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">House</MenuItem>
              <MenuItem value="2">Apartment</MenuItem>
            </Select>
          </FormControl>
        </span>
  
        <span className="spaces">
          <FormControl variant="filled" className="dropdown">
            <InputLabel id="bedrooms">Bedrooms</InputLabel>
            <Select
              labelId="bedrooms"
              id="dropdown"
    	  name="bedrooms" value={this.state.bedrooms} onChange={(e) => this.handleUserChange(e)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="1">1 bedroom</MenuItem>
                <MenuItem value="2">2 bedrooms</MenuItem>
                <MenuItem value="3">3 bedrooms</MenuItem>
                <MenuItem value="4">4 bedrooms</MenuItem>
                <MenuItem value="5">5 bedrooms</MenuItem>
                <MenuItem value="6">6 bedrooms</MenuItem>
    
            </Select>
          </FormControl>
        </span>
  
        <span className="spaces">
          <FormControl variant="filled" className="dropdown">
            <InputLabel id="bathrooms">Bathrooms</InputLabel>
            <Select
              labelId="bathrooms"
              id="dropdown"
    	        name="bathrooms" value={this.state.bathrooms} onChange={(e) => this.handleUserChange(e)}>
              <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="1">1 bathroom</MenuItem>
                <MenuItem value="2">2 bathrooms</MenuItem>
                <MenuItem value="3">3 bathrooms</MenuItem>
                <MenuItem value="4">4 bathrooms</MenuItem>
                <MenuItem value="5">5 bathrooms</MenuItem>
                <MenuItem value="6">6 bathrooms</MenuItem>
    
            </Select>
          </FormControl>
        </span>
      </div>
      <br></br>
          <div className="row">
          <span className="spaces">
              <TextField
              variant="outlined"
              label="Street"
              id="street"
              name="street" type="text" placeholder="Street" onChange={(e) => this.handleUserChange(e)}/>
            </span>
          </div>
          <br></br>
          <div className="row">
            <span className="spaces">
              <TextField
              variant="outlined"
              label="City"
              id="city"
              name="city" type="text" placeholder="City" onChange={(e) => this.handleUserChange(e)}/>
            </span>
            <span className="spaces">
              <TextField
              variant="outlined"
              label="State"
              id="state"
              name="state" type="text" placeholder="State" onChange={(e) => this.handleUserChange(e)}/>
            </span>
            <span className="spaces">
              <TextField
              variant="outlined"
              label="Zip"
              id="zip"
              name="zip" type="integer" placeholder="Zip" onChange={(e) => this.handleUserChange(e)}/>
            </span>
          </div>
          <h3>Amenities</h3>
          <FormControlLabel control={<Checkbox id="parking" name="amenities" value="parking" onChange={this.handleChecked}
            checked={this.state.parking} style={{ color: '#607d8b' }} />} label="Parking" />
          <FormControlLabel control={<Checkbox id="television"
            name="amenities"
            value="television"
            onChange={this.handleChecked}
            checked={this.state.television} style={{ color: '#607d8b' }} />} label="Television" />
          <FormControlLabel control={<Checkbox id="washer_dryer"
            name="amenities"
            value="washer_dryer"
            onChange={this.handleChecked}
            checked={this.state.washer_dryer} style={{ color: '#607d8b' }} />} label="Washer/Dryer" />
            <br></br>
          <FormControlLabel control={<Checkbox id="air_conditioning"
            name="Amenities"
            value="air_conditioning"
            onChange={this.handleChecked}
            checked={this.state.air_conditioning} style={{ color: '#607d8b' }} />} label="Air Conditioning" />
          <FormControlLabel control={<Checkbox id="wifi"
            name="amenities"
            value="wifi"
            onChange={this.handleChecked}
            checked={this.state.wifi} style={{ color: '#607d8b' }} />} label="Wifi" />
          <FormControlLabel control={<Checkbox id="hair_dryer"
            name="amenities"
            value="hair_dryer"
            onChange={this.handleChecked}
            checked={this.state.hair_dryer} style={{ color: '#607d8b' }} />} label="Hair Dryer" />
          <FormControlLabel control={<Checkbox id="pool"
            name="amenities"
            value="pool"
            onChange={this.handleChecked}
            checked={this.state.pool} style={{ color: '#607d8b' }} />} label="Pool" />
          <div className="photos">

          <CreateCarousel addPhoto={this.addPhoto} uploadPhoto={this.state.uploadedPhoto} />

          <div>
            </div>
          <div className="button">
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
          </div>
        </form>
      </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => state

export default connect(mapStateToProps, { getUser })(CreateListing)
