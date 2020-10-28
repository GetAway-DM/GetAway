import React from 'react'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'

const Post = (props) => {
  console.log(props)
  console.log(props.authReducer.user.user_id)
  console.log(props.post.author_id)
  return (
    <li className="post-container">
      <div>
        <StarRatingComponent
          name="rate2"
          editing={false}
          starCount={5}
          value={props.post.rating}
        />
        <p className="post-text">{props.post.content}</p>
        <p className="post-author">~{props.post.first_name}</p>
      </div>
      <div className="post-buttons">
        {props.authReducer.user.user_id === props.post.author_id ? (
          <div>
            {/* <button
              className="input-container-button-small"
              onClick={() => {
                props.toggleEdit()
              }}>
              Edit
            </button> */}
            <button
              className="input-container-button-small"
              onClick={() => {
                props.handleDelete(props.post.review_id)
              }}>
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </li>
  )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Post)
