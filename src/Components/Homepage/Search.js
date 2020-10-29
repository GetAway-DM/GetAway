import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getLocation } from '../../ducks/locationReducer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

const styles = makeStyles((theme) => ({
  divider: {
    height: 28,
    margin: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
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
                <div className="autocomplete-dropdown-container">
                  {loading && (
                    <CircularProgress
                      size={100}
                      color={'secondary'}
                      style={{ position: 'relative', top: '8rem', left: '-2rem' }}
                    />
                  )}
                  <IconButton
                    type="submit"
                    className={classes.iconButton}></IconButton>
                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton></IconButton>
                  <div
                    style={{
                      width: '50rem',
                      position: 'relative',
                      left: '35rem',
                      textAlign: 'left',
                      fontFamily: 'Roboto',
                    }}>
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item'
                      const style = suggestion.active
                        ? {
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
                          // onClick={() => this.handleInputProperty(suggestion)}
                          >
                            {suggestion.description}
                          </span>
                        </div>
                      )
                    })}
                  </div>
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
