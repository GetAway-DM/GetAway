import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BiCurrentLocation } from 'react-icons/bi'
// import MapContainer from '.././MapContainer'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

const styles = makeStyles((theme) => ({
  searchBarHp: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '20rem',
    position: 'relative',
    left: '50rem',
    top: '3rem',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      selectedProperty: {},
    }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error))
  }

  handleInputProperty = (property) => {
    // TODO this.props.action
  }

  render() {
    console.log(this.state)
    const classes = styles
    // start
    return (
      <Paper className="searchBarHp">
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
            <div>
              <input
                {...getInputProps({
                  placeholder: "Try searching 'San Francisco'",
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && (
                  <CircularProgress
                    size={200}
                    color={'secondary'}
                    style={{ position: 'relative', top: '8rem', left: '-2rem' }}
                  />
                )}
                <IconButton type="submit" className={classes.iconButton}>
                  {/* <SearchIcon /> */}
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton>
                  <BiCurrentLocation />
                </IconButton>
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
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
            </div>
          )}
        </PlacesAutocomplete>
      </Paper>
    )
  }
}
