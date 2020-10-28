import React from 'react'
import Post from './Post'

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
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
      <Post
        handleDelete={this.props.handleDelete}
        post={this.props.review}
        toggleEdit={this.toggleEdit}
      />
    )
  }
}

export default ReviewContainer
