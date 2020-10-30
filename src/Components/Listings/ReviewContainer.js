import React from 'react'
import Post from './Post'
import Box from '@material-ui/core/Box'

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
    console.log(this.props)
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  render() {
    return (
      /*this.state.isEditing ? (
      <Edit
        handleEdit={this.props.handleEdit}
        post={this.props.review}
        toggleEdit={this.toggleEdit}
       />
     ) : */
      <Box className="box">
        <Post
          handleDelete={this.props.handleDelete}
          post={this.props.review}
          toggleEdit={this.toggleEdit}
        />
      </Box>
    )
  }
}

export default ReviewContainer
