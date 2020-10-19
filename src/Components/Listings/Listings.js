import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import { getUserListing } from '../../ducks/listReducer'


const Listings = (props) => {
    const currentListing = useSelector(state => state.listing)


    return (
            <div>
                <h1>{listing.title}</h1>
                <h2>{listing.price}</h2>
            </div>
    )
}

Listings.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    host: PropTypes.string
}

export default Listings

