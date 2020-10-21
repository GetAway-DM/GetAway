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
                {currentListing.description}
                {currentListing.city}
                {currentListing.first_name}
                {currentListing.last_name}
                {currentListing.profile_img}
                <div><p>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering
                    animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
                    undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra
                    adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max
                    brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem
                    virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead
                    zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.
                </p></div>
                <Carousel/>
            </>
    )
}

AddListings.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    host: PropTypes.string
}

export default AddListings
