import React, { useState, useEffect } from 'react'
import AddListings from './AddListings'
import Amenities from './Amenities'
import Reservation from './Reservation'
import Reviews from './Reviews'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

const Listings = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios.get('/api/auth/me').then((res) => {
      props.getUser(res.data)
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <div>
      {isLoading ? (
        <CircularProgress
          size={200}
          color={'secondary'}
          style={{ position: 'relative', top: '8rem', left: '-2rem' }}
        />
      ) : (
        <div>
          <div>
            <AddListings />
            <Reservation
              listing={props.match.params.listing_id}
              history={props.history.push}
            />
            <Amenities listing={props.match.params.listing_id} />
            <Reviews listing_id={props.match.params.listing_id} />
          </div>
        </div>
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUser })(Listings)
