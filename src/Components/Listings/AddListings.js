import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import StarRatingComponent from 'react-star-rating-component'
// import Rating from './Rating'
import Rules from './Rules'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './listing.css'

const AddListings = (props) => {
  const currentListing = useSelector((state) => state.listReducer.listing)
  const dispatch = useDispatch()

  // TODO loading section

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

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }))
  const classes = useStyles()

  console.log(currentListing)

  return (
    <div>
      <div>
        <h1 className="listing-title">{currentListing.title}</h1>
      </div>
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
      <Carousel listing={props.match.params.listing_id} />
      <Rules />
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
          alt="profile Image"
          className="listing-profile-img"
        />
      </div>
      <div className="listing-bedrooms">
        <h3>{currentListing.bedrooms} Bedrooms</h3>
      </div>
      <div className="listing-bathrooms">
        <h3>{currentListing.bathrooms} Bathrooms</h3>
      </div>
    </div>
  )
}

AddListings.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  host: PropTypes.string,
}

export default withRouter(AddListings)
