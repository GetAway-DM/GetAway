import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReviewContainer from './ReviewContainer'
import { getUser } from '../../ducks/authReducer'
import StarRatingComponent from 'react-star-rating-component'
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import Divider from '@material-ui/core/Divider'
// import ListItemText from '@material-ui/core/ListItemText'
// import ListItemAvatar from '@material-ui/core/ListItemAvatar'
// import Avatar from '@material-ui/core/Avatar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import './reviews.css'

const useStyles = makeStyles((theme) => ({
  theroot: {
    borderTop: 0,
    boxSizing: 'borderBox',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px grey',
    color: 'black',
    position: 'relative',
    left: '0rem',
    top: '-40rem',
    height: '60vh',
    width: '110vw',
    padding: '0 30px',
    zIndex: 1,
  },
  inline: {
    display: 'inline',
  },
}))

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
})
const Reviews = (props) => {
  const classes = useStyles()
  const [reviews, setReviews] = useState([])
  const [createdAt] = useState(null)
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)

  const currentListing = useSelector((state) => state.listReducer.listing)
  const user = useSelector((state) => state.authReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    getReviews()
    dispatch({ type: 'GET_USER' })
  }, [])

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue)
  }

  const getReviews = () => {
    axios.get(`/api/reviews/getreviews/${props.listing_id}`).then((res) => {
      setReviews(res.data)
    })
  }

  const handleClick = () => {
    const property_id = props.listing_id
    const { user_id } = user
    axios
      .post(`/api/reviews/addreviews/${props.listing_id}`, {
        property_id,
        user_id,
        rating,
        content,
        createdAt,
      })
      .then((res) => {
        setReviews(res.data)
        setContent('')
        setRating(1)
      })
  }

  const handleDelete = (review_id) => {
    axios
      .delete(`/api/reviews/deletereviews/${props.listing_id}/${review_id}`)
      .then((res) => {
        setReviews(res.data)
      })
  }

  const mappedReviews = reviews.map((e) => {
    return (
      <ReviewContainer
        review={e}
        key={e.review_id}
        handleDelete={handleDelete}
      />
    )
  })

  return (
    <MuiThemeProvider
      theme={theme}
      style={{ minHeight: '20vh', maxHeight: '320vh' }}>
      <Container className={classes.theroot}>
        <List>
          <Box className="app-body">
            <div className="padding" />
            <ul className="flex-vertical-center review-feed">
              {mappedReviews}
            </ul>
          </Box>
          <Box className="input-container">
            <div style={{ position: 'relative' }}>
              <Typography>
                <h3>Your Rating Here: </h3>
              </Typography>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={setRating}
              />
            </div>
            <TextareaAutosize
              id="new-review"
              cols="25"
              rows="5"
              placeholder="Let us know how were doing!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              style={{ postion: 'relative', left: '-10rem', top: '2.5rem' }}
              variant="contained"
              color="primary"
              onClick={() => {
                handleClick()
              }}
              className="input-container-button">
              Post
            </Button>
          </Box>
        </List>
      </Container>
    </MuiThemeProvider>
  )
}

export default Reviews
