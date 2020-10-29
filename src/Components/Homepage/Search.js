import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { BiCurrentLocation } from 'react-icons/bi'
import { connect } from 'react-redux'
import { getLocation } from '../../ducks/locationReducer'
// import MapContainer from '.././MapContainer'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
// import white from '@material-ui/core/colors'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'

const config = require('../.././config')

const styles = makeStyles((theme) => ({
  // searchBarHp: {
  //   padding: '2px 4px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   width: '20rem',
  //   position: 'relative',
  //   left: '50rem',
  //   top: '3rem',
  // },
  // input: {
  //   marginLeft: theme.spacing(1),
  //   flex: 1,
  // },
  // iconButton: {
  //   padding: 10,
  // },
  divider: {
    height: 28,
    margin: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    // color: white[500],
  },
}))

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      selectedProperty: {},
      isHidden: true,
    }
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    })
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng)
        this.props.getLocation(latLng)
        this.props.history.push('/dashboard')
      })
      .catch((error) => console.error('Error', error))
  }

  render() {
    console.log(this.state)
    const classes = styles
    return (
      <>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}>
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
              <>
                <TextField
                  {...getInputProps({
                    placeholder: "Try searching 'San Francisco'",
                    className: 'location-search-input',
                  })}
                  style={{
                    margin: 8,
                    width: '50rem',
                    height: '10rem',
                    position: 'relative',
                    top: '3rem',
                    color: 'white',
                  }}
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Search Nearby Listings"
                  placeholder="Try searching 'San Francisco'"
                  id="outlined-full-width"
                  margin="normal"
                  size="large"
                />
                {/* <TextField
                fullWidth
                 {...getInputProps({
                style={{ margin: 8 }}
                })}
              /> */}
                <div className="autocomplete-dropdown-container">
                  {loading && (
                    <CircularProgress
                      size={100}
                      color={'secondary'}
                      style={{ position: 'relative', top: '8rem', left: '-2rem' }}
                    />
                  )}
                  <IconButton type="submit" className={classes.iconButton}>
                    {/* <SearchIcon /> */}
                  </IconButton>
                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton>
                    {/* <BiCurrentLocation className="bicurrent" /> */}
                  </IconButton>
                  <div
                    style={{
                      // border: 'inset',
                      width: '50rem',
                      position: 'relative',
                      left: '35rem',
                      textAlign: 'left',
                      fontFamily: 'Roboto',
                    }}
                  //  : onChange={this.toggleHidden.bind(this)}
                  // : {!this.state.isHidden}
                  >
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item'
                      const style = suggestion.active
                        ? {
                          backgroundColor: '#fafafa',
                          cursor: 'pointer',
                          color: 'black',
                          opactiy: '90%',
                          borderRadius: '10%',
                          backgroundColor: 'transparent',
                        }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' }
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}>
                          <span
                            onClick={() => this.handleInputProperty(suggestion)}>
                            {suggestion.description}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  {/* )} */}
                </div>
              </>
            )}
        </PlacesAutocomplete>
      </>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getLocation })(withRouter(Search))
