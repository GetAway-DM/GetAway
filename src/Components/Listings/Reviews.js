import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewContainer from './ReviewContainer'
import { getUser } from '../../ducks/authReducer'
import StarRatingComponent from 'react-star-rating-component'

import axios from 'axios'
import './reviews.css'

class Reviews extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reviews: [],
      created_at: null,
      content: '',
      rating: 0,
    }
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.getUser().catch((err) => {
        this.props.history.push('/')
      })
    }
    this.getReviews()
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue })
  }

  getReviews = () => {
    axios
      .get(`/api/reviews/getreviews/${this.props.listing_id}`)
      .then((res) => {
        this.setState({
          reviews: res.data,
        })
        console.log(this.state.reviews)
      })
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    })
  }

  handleClick = () => {
    const property_id = this.props.listing_id
    const { user_id } = this.props.authReducer.user
    const { rating, content, created_at } = this.state
    axios
      .post(`/api/reviews/addreviews/${this.props.listing_id}`, {
        property_id,
        user_id,
        rating,
        content,
        created_at,
      })
      .then((res) =>
        this.setState({ reviews: res.data, content: '', rating: 1 })
      )
  }

  handleDelete = (review_id) => {
    axios
      .delete(
        `/api/reviews/deletereviews/${this.props.listing_id}/${review_id}`
      )
      .then((res) => {
        this.setState({ reviews: res.data })
      })
  }

  render() {
    const mappedReviews = this.state.reviews.map((e) => {
      return (
        <ReviewContainer
          review={e}
          key={e.review_id}
          handleDelete={this.handleDelete}
        />
      )
    })
    return (
      <div>
        <section className="app-body">
          <div className="padding" />
          <ul className="flex-vertical-center review-feed">{mappedReviews}</ul>
        </section>
        <div className="input-container">
          <p>
            Your Rating Here:
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={this.state.rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </p>
          <textarea
            id="new-review"
            cols="25"
            rows="5"
            placeholder="Let us know how were doing!"
            value={this.state.content}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
          <button
            onClick={() => {
              this.handleClick()
            }}
            className="input-container-button">
            Post
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser })(Reviews)
