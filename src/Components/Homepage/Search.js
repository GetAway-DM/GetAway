// import React, { Component } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import { BiCurrentLocation } from 'react-icons/bi'
// // import MapContainer from '.././MapContainer'
// import Paper from '@material-ui/core/Paper'
// import InputBase from '@material-ui/core/InputBase'
// import Divider from '@material-ui/core/Divider'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
// import SearchIcon from '@material-ui/icons/Search'
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocmplete'

// const styles = makeStyles((theme) => ({
//   searchBarHp: {
//     padding: '2px 4px',
//     display: 'flex',
//     alignItems: 'center',
//     width: 400,
//     position: 'relative',
//     left: '50rem',
//     top: '3rem',
//   },
//   input: {
//     marginLeft: theme.spacing(1),
//     flex: 1,
//   },
//   iconButton: {
//     padding: 10,
//   },
//   divider: {
//     height: 28,
//     margin: 4,
//   },
// }))

// export default class Search extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { address: '' }
//   }

//   handleChange = (address) => {
//     this.setState({ address })
//   }

//   handleSelect = (address) => {
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => console.log('Success', latLng))
//       .catch((error) => console.error('Error', error))
//   }

//   render() {
//     const classes = styles
//     return (
//       <div>
//         <PlacesAutocomplete
//           value={this.state.address}
//           onChange={this.handleChange}
//           onSelect={this.handleSelect}>
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: 'Search Places ...',
//                   className: 'location-search-input',
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? 'suggestion-item--active'
//                     : 'suggestion-item'
//                   const style = suggestion.active
//                     ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                     : { backgroundColor: '#ffffff', cursor: 'pointer' }
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}>
//                       <span>{suggestion.description}</span>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//         <Paper component="form" className={classes.searchBarHp}>
//           <IconButton className={classes.iconButton} aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <InputBase
//             className={classes.input}
//             placeholder="Try searching 'San Diego'"
//             inputProps={{ 'aria-label': 'search google maps' }}
//           />
//           <IconButton
//             type="submit"
//             className={classes.iconButton}
//             aria-label="search">
//             <SearchIcon />
//           </IconButton>
//           <Divider className={classes.divider} orientation="vertical" />
//           <IconButton>
//             <BiCurrentLocation />
//           </IconButton>
//         </Paper>
//       </div>
//     )
//   }
// }
