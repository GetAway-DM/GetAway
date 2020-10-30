import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import StarRatingComponent from 'react-star-rating-component'
import Rules from './Rules'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Amenities from './Amenities'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
// import Reviews from './Reviews'
// import Button from '@material-ui/core/Button'
// import SaveIcon from '@material-ui/icons/Save'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './listing.css'

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxSizing: 'borderBox',
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px grey',
    color: 'black',
    position: 'relative',
    height: '300vh',
    width: '90vw',
    top: '10rem',
    padding: '0 30px',
    zIndex: -1,
  },
  main: {
    boxSizing: 'borderBox',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px grey',
    color: 'black',
    position: 'relative',
    // display: 'flex',
    height: '50vh',
    width: '40vw',
    top: '10rem',
    padding: '0 30px',
    zIndex: -1,
  },
})

const AddListings = (props) => {
  const classes = useStyles()
  const currentListing = useSelector((state) => state.listReducer.listing)
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/api/listing/getlisting/${props.match.params.listing_id}`)
        .then((res) => dispatch({ type: 'GET_LIST', payload: res.data }))
        .catch((error) => {
          console.log(error.message)
        })
    }, 3000)
  }, [])

  return (
    <Container className={classes.root} maxWidth={'xl'}>
      <Box>
        <h1
          style={{
            position: 'relative',
            left: '-30rem',
            fontSize: '80px',
            fontFamily: 'Cormorant Garamond',
          }}
          className="listing-title">
          {currentListing.title}
        </h1>
      </Box>
      <Carousel listing={props.match.params.listing_id} />
      <Box className={classes.main}>
        <span
          className="listing-first_name"
          style={{ position: 'relative', right: '15rem', top: '1rem' }}>
          <h6>{currentListing.first_name}</h6>
        </span>
        <span
          className="listing-last-name"
          style={{ position: 'relative', right: '15rem', top: '1rem' }}>
          <h6>{currentListing.last_name}</h6>
        </span>
        <div className="listing-city">
          <h3>
            {currentListing.city}, {currentListing.state}
          </h3>
        </div>
        <p>
          <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={5}
            value={currentListing.avg}
          />
          ({currentListing.avg})
        </p>
        <div
          className="listing-description"
          style={{ position: 'relative', left: '3rem' }}>
          <p>{currentListing.description}</p>
        </div>
        <div
          className="listing-img"
          style={{
            position: 'relative',
            left: '-15rem',
            top: '-7rem',
          }}>
          <img
            sizes={'lg'}
            src={currentListing.profile_img}
            alt="profile"
            style={{
              borderRadius: '50%',
              border: '1px solid',
              marginLeft: '2rem',
            }}
          />
        </div>
        <div
          className="listing-bedrooms"
          style={{
            position: 'relative',
            top: '-15rem',
            left: '17rem',
            display: 'flex',
            columnGap: '10px',
          }}>
          <h6>{currentListing.bedrooms} Bedrooms</h6>
          <br />
          <h6>{currentListing.bathrooms} Bathrooms</h6>
        </div>
        <div>
          <Amenities
            listing={props.match.params.listing_id}
            style={{ position: 'relative', top: '20rem' }}
          />
        </div>
      </Box>
      <Rules />
      <Divider orientation="vertical" flexItem />
    </Container>
  )
}

AddListings.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  host: PropTypes.string,
}

export default withRouter(AddListings)
