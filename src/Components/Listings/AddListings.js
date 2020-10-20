import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import axios from 'axios'

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
                    {currentListing.title}
                    <Carousel/>
                    </>
        )
}

AddListings.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    host: PropTypes.string,
}


export default AddListings
