import React, { Component } from 'react'
import { connect } from 'react-redux'

import Rating from './Rating'
import axios from 'axios'
import './reviews.css'

class Reviews extends Component {
    constructor(){
        super()

        this.state = {
            reviews: [],
            userInput: '',
            created_at: null
        }
    }

    componentDidMount() {
        if(!this.props.isLoggedIn){
            this.props.getUser().catch((err) => {
                this.props.history.push('/')
            })
        }
        this.getReviews()
    }
}

getReviews = () => {
    axios.get('/api/reviews').then((res) => {
        this.setState({
            reviews: res.data,
        })
    })
}

handleChange = (e) => {
    this.setState({
        userInput: e.target.value,
    })
}

handleClick = () => {
    const { userInput: content ,created_at } = this.state
    axios
            .post('/api/reviews/addreviews/${property_id}', { content, created_at })
            .then((res) => this.setState({reviews: res.data, userInput: ''})
    )
}

handleDelete = (propertyId, reviewId) => {
    axios.delete(`/api/reviews/deletereviews/${propertyId}`).then((res) => {
        this.setState({reviews: res.data})
    })
}

render(){
    const mappedReviews = this.state.reviews.map((reviews, index) => {
        return (
                <ReviewContainer
                        review={review}
                        key={review.id}
                        handleDelete={this.handleDelete}
                    />
        )
    })
    return (
            <>
                <div className="input-container">
                    <textarea
                      id="new-review"
                      cols="25"
                      rows="5"
                      placeholder="Let us know how were doing!"
                      value={this.state.userInput}
                      onChange={(e) => {
                          this.handlechange(e)
                      }}
                    />
                    <button
                            onClick={() => {
                                this.handleClick()
                            }}
                            className="input-container-button"
                    >
                       Post
                    </button>
                </div>

                <section className="app-body">
                    <div className="padding"/>
                    <ul className="flex-vertical-center review-feed">{mappedReviews}</ul>
                </section>
            </>
    )
  }
}

const mapStateToProps = reduxState => reduxState


export default connect(mapStateToProps, { getUser })(Reviews)
