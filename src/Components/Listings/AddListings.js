import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import StarRatingComponent from 'react-star-rating-component'
import Rules from './Rules'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
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
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: '150vh',
    padding: '0 30px',
    zIndex: 1,
  },
  rules: {
    zIndex: '2',
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
        <h1 className="listing-title">{currentListing.title}</h1>
      </Box>
      <Carousel listing={props.match.params.listing_id} />
      <div className="listing-city">
        <h3>{currentListing.city}</h3>
      </div>
      <div>
        <h3>{currentListing.state}</h3>
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
      <div className="listing-description">
        <p>{currentListing.description}</p>
      </div>
      <div className="listing-first_name">
        <h4>{currentListing.first_name}</h4>
      </div>
      <div className="listing-last-name">
        <h4>{currentListing.last_name}</h4>
      </div>
      <div className="listing-img">
        <img
          src={currentListing.profile_img}
          alt="profile"
          className="listing-profile-img"
        />
      </div>
      <div className="listing-bedrooms">
        <h3>{currentListing.bedrooms} Bedrooms</h3>
      </div>
      <div className="listing-bathrooms">
        <h3>{currentListing.bathrooms} Bathrooms</h3>
        <Rules />
      </div>
    </Container>
  )
}

AddListings.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  host: PropTypes.string,
}

export default withRouter(AddListings)
