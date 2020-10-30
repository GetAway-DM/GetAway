import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { FaSwimmingPool, FaWifi, FaParking } from 'react-icons/fa'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { FiWind } from 'react-icons/fi'
import { RiTempColdLine } from 'react-icons/ri'
import { CgScreen } from 'react-icons/cg'
import AddPhoto from './AddPhoto'
import Photo from './Photo'
import Container from '@material-ui/core/Container'
import './mylistings.css'
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  props: {
    variantMapping: {
      h1: 'h2',
      h2: 'h2',
      h3: 'h2',
      h4: 'h2',
      h5: 'h2',
      h6: 'h2',
      subtitle1: 'h2',
      subtitle2: 'h2',
      body1: 'span',
      body2: 'span',
    },
  },
  palette: {
    primary: blueGrey,
  },
})

class MyListings extends Component {
  constructor(props) {
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
  async componentDidMount() {
    const { listing_id } = this.props.listing
    const {
      title,
      description,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
    } = this.props.listing
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
      zip,
    })
    await axios.get(`/api/listing/amenities/${listing_id}`).then((res) => {
      const {
        amenities_id,
        parking,
        television,
        washer_dryer,
        air_conditioning,
        wifi,
        hair_dryer,
        pool,
      } = res.data
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
        photos: res.data,
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
    console.log(this.state.parking)
  }
  addPhoto = (newPhoto) => {
    this.setState({
      uploadedPhoto: [...this.state.uploadedPhoto, newPhoto],
    })
  }
  handleDetails = (e) => {
    e.preventDefault()
    const {
      listing_id,
      title,
      description,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
    } = this.state
    axios
      .put('/api/listing/editlistingdetails', {
        listing_id,
        title,
        description,
        bedrooms,
        bathrooms,
        price,
        street,
        city,
        state,
        zip,
      })
      .then(window.location.reload())
  }
  handleAmenities = (e) => {
    e.preventDefault()
    const {
      amenities_id,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool,
    } = this.state
    axios
      .put('/api/listing/editlistingamenities', {
        amenities_id,
        parking,
        television,
        washer_dryer,
        air_conditioning,
        wifi,
        hair_dryer,
        pool,
      })
      .then(window.location.reload())
  }
  handlePhotos = (e) => {
    const { listing_id } = this.props.listing
    const uploadedPhoto = this.state.uploadedPhoto
    axios
      .post(`/api/listingphoto/uploadphoto/${listing_id}`, { uploadedPhoto })
      .then(window.location.reload())
  }

  deleteListing = () => {
    axios
      .delete(`/api/listing/deletelisting/${this.state.listing.listing_id}`)
      .then(window.location.reload())
  }

  render(props) {
    // const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Container className="container-listing">
          <Box component="span" m={1} className="listing-container">
            <Typography variant="h3">{this.state.title}</Typography>
            {this.state.photosEdit === false ? (
              <Box>
                <Photo photos={this.state.photos} />
                <Button
                  name="photosEdit"
                  onClick={(e) => {
                    this.toggleEdit(e)
                  }}
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  Add Photos
                </Button>
              </Box>
            ) : (
              <Box>
                <AddPhoto
                  addPhoto={this.addPhoto}
                  uploadPhoto={this.state.uploadedPhoto}
                />
                <Button
                  onClick={(e) => {
                    this.handlePhotos(e)
                  }}
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  Submit Photos
                </Button>
                <Button
                  name="photosEdit"
                  onClick={(e) => {
                    this.toggleCancel(e)
                  }}
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  Cancel Adding Photos
                </Button>
              </Box>
            )}
            <div className="info-listing-container">
              {this.state.detailsEdit === false ? (
                <Box className="details-container">
                  <Typography variant="body1">
                    {this.state.description}
                  </Typography>
                  <Typography variant="body1">
                    Bedrooms: {this.state.bedrooms}
                  </Typography>
                  <Typography variant="body1">
                    Bathrooms: {this.state.bathrooms}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${this.state.price}
                  </Typography>
                  <Typography variant="body1">
                    Address:{this.state.street}
                  </Typography>
                  <Typography variant="body1">
                    {this.state.city} {this.state.state}
                  </Typography>
                  <p>{this.state.zip}</p>
                  <Button
                    onClick={(e) => {
                      this.toggleEdit(e)
                    }}
                    name="detailsEdit"
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                    Edit Details
                  </Button>
                </Box>
              ) : (
                <Box>
                  <FormLabel>Title</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="zip"
                    label="Title"
                    name="title"
                    autoComplete="zip"
                    autoFocus
                    value={this.state.title}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <FormLabel>Description</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    value={this.state.description}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <FormLabel>Bedrooms</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="bedrooms"
                    label="Bedrooms"
                    name="bedrooms"
                    autoComplete="bedrooms"
                    autoFocus
                    value={this.state.bedrooms}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <FormLabel>Bathrooms:</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="bathrooms"
                    label="Bathrooms"
                    name="bathrooms"
                    autoComplete="bathrooms"
                    autoFocus
                    value={this.state.bathrooms}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <FormLabel>Price $</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="price"
                    label="Price"
                    name="price"
                    autoComplete="price"
                    autoFocus
                    value={this.state.price}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <FormLabel>Address</FormLabel>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                    autoFocus
                    value={this.state.street}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    autoFocus
                    value={this.state.city}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />{' '}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                    autoFocus
                    value={this.state.street}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="state"
                    autoFocus
                    value={this.state.state}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="zip"
                    label="Zip Code"
                    name="zip"
                    autoComplete="zip"
                    autoFocus
                    value={this.state.zip}
                    onChange={(e) => {
                      this.handleInput(e)
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      this.handleDetails(e)
                    }}
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                    Submit Details
                  </Button>
                  <Button
                    onClick={(e) => {
                      this.toggleCancel(e)
                    }}
                    variant="contained"
                    color="primary"
                    name="detailsEdit"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                    Cancel Edit
                  </Button>
                </Box>
              )}
              <div>
                <h4>Amenities</h4>
                {this.state.amenitiesEdit === false ? (
                  <div>
                    {this.state.parking === true ? (
                      <p value={this.state.parking}>
                        {' '}
                        <FaParking /> Parking
                      </p>
                    ) : null}
                    {this.state.television ? (
                      <p value={this.state.television}>
                        {' '}
                        <CgScreen /> Television
                      </p>
                    ) : null}
                    {this.state.washer_dryer ? (
                      <p value={this.state.washer_dryer}>
                        {' '}
                        <CgSmartHomeWashMachine /> Washer/Dryer
                      </p>
                    ) : null}
                    {this.state.air_conditioning ? (
                      <p value={this.state.air_conditioning}>
                        {' '}
                        <RiTempColdLine /> Air Conditioning
                      </p>
                    ) : null}
                    {this.state.wifi ? (
                      <p value={this.state.wifi}>
                        {' '}
                        <FaWifi /> Wifi
                      </p>
                    ) : null}
                    {this.state.hair_dryer ? (
                      <p value={this.state.hair_dryer}>
                        {' '}
                        <FiWind /> Hair Dryer
                      </p>
                    ) : null}
                    {this.state.pool ? (
                      <p value={this.state.pool}>
                        {' '}
                        <FaSwimmingPool /> Pool
                      </p>
                    ) : null}
                    <Button
                      onClick={(e) => {
                        this.toggleEdit(e)
                      }}
                      variant="contained"
                      color="primary"
                      name="amenitiesEdit"
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      Edit Amenities
                    </Button>
                  </div>
                ) : (
                  <Box>
                    <FormLabel>Parking</FormLabel>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          checked={this.state.parking}
                          onChange={this.handleChecked}
                          value="parking"
                          style={{ color: '#607d8b' }}
                          name="amenities"
                          id="parking"
                        />
                      }
                      type="checkbox"
                    />

                    <FormLabel>Television</FormLabel>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          value="television"
                          style={{ color: '#607d8b' }}
                          onChange={this.handleChecked}
                          checked={this.state.television}
                          id="television"
                          name="amenities"
                        />
                      }
                      type="checkbox"
                    />

                    <FormLabel>Washer/Dryer</FormLabel>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          value="washer_dryer"
                          style={{ color: '#607d8b' }}
                          onChange={this.handleChecked}
                          checked={this.state.washer_dryer}
                          id="washer_dryer"
                          name="amenities"
                        />
                      }
                      type="checkbox"
                    />

                    <FormLabel>Air Conditioning</FormLabel>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          value="Air Conditioning"
                          style={{ color: '#607d8b' }}
                          onChange={this.handleChecked}
                          checked={this.state.air_conditioning}
                          id="air_conditioning"
                          name="amenities"
                        />
                      }
                      type="checkbox"
                    />

                    <FormLabel>Wifi</FormLabel>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          value="wifi"
                          style={{ color: '#607d8b' }}
                          onChange={this.handleChecked}
                          checked={this.state.wifi}
                          id="wifi"
                          name="amenities"
                        />
                      }
                      type="checkbox"
                    />

                    <label>Hair Dryer</label>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          value="hair_dryer"
                          style={{ color: '#607d8b' }}
                          onChange={this.handleChecked}
                          checked={this.state.hair_dryer}
                          id="hair_dryer"
                          name="amenities"
                        />
                      }
                      type="checkbox"
                    />
                    <FormLabel>Pool</FormLabel>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          value="hair_dryer"
                          style={{ color: '#607d8b' }}
                          id="pool"
                          name="amenities"
                          value="pool"
                          onChange={this.handleChecked}
                          checked={this.state.pool}
                        />
                      }
                      type="checkbox"
                    />
                    <Button
                      onClick={(e) => {
                        this.handleAmenities(e)
                      }}
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      Submit Amenities
                    </Button>
                    <Button
                      onClick={(e) => {
                        this.toggleCancel(e)
                      }}
                      name="amenitiesEdit"
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      Cancel Amenities Edit
                    </Button>
                  </Box>
                )}
              </div>{' '}
            </div>
            <Button
              onClick={(e) => {
                this.props.push(`/listing/${this.state.listing_id}`)
              }}
              variant="contained"
              color="primary"
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}>
              Go To Listing
            </Button>
            <Button
              onClick={(e) => {
                this.deleteListing()
              }}
              variant="contained"
              color="primary"
              className="my-listing-button"
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}>
              Delete Listing
            </Button>
          </Box>
        </Container>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(MyListings)
