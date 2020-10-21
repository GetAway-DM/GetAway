import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import axios from 'axios'
import './listing.css'

const AddListings = () => {
    const currentListing = useSelector((state) => state.listReducer.listing)
    const dispatch = useDispatch()

    useEffect(() => {
        axios
                .get(`/api/listing/getlisting/${1}`)
                .then((res) => dispatch({ type: 'GET_LIST', payload: res.data }))
                .catch((error) => console.log(error.message))
    }, [])

    return (
            <>
                <div>
               <h1 className="listing-title">{currentListing.title}</h1>
                </div>
                <div className="listing-city">
                    <h3>{currentListing.city}</h3>
                </div>
                <div>
                    <h3>{currentListing.state}</h3>
                </div>
                <Carousel />
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
                <img src={currentListing.profile_img} alt="profile Image" className="listing-profile-img"/>
                </div>
                <div className="listing-bedrooms">
                    <h3>{currentListing.bedrooms}</h3>
                </div>
                <div className="listing-bathrooms">
                    <h3>{currentListing.bathrooms}</h3>
                </div>
            </>
    )
}

AddListings.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    host: PropTypes.string
}

export default AddListings
