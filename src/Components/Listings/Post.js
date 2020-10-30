import React from 'react'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'
import Button from '@material-ui/core/Button'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
})

const Post = (props) => {
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
            <MuiThemeProvider theme={theme}>
              <Button
                onClick={() => {
                  props.handleDelete(props.post.review_id)
                }}
                name="detailsEdit"
                variant="contained"
                color="primary"
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}>
                Delete
              </Button>
            </MuiThemeProvider>
          </div>
        ) : null}
      </div>
    </li>
  )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Post)
