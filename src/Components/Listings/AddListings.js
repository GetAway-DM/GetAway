import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getUserListing } from '../../ducks/listReducer'

const AddListings = (props) => {
    const currentListing = useSelector((state) => state.listReducer.listing)
    const dispatch = useDispatch()

    useEffect(() => {
        axios
                .get(`/api/listing/getlisting/${1}`)
                .then((res) => dispatch({ type: 'GET_LIST', payload: res.data }))
                .catch((error) => console.log(error.message))
    },[])

    console.log(currentListing)
    return (
            <div>
            <div>{currentListing.title}</div>
            </div>
    )
}



AddListings.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    host: PropTypes.string,
}

export default AddListings
