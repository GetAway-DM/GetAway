import React from 'react'
import Post from './Post'
import Edit from './Edit'


class ReviewContainer extends React.Component {
    constructor() {
        super()
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
        return this.state.isEditing ? (
                <Edit
                        handleEdit={this.props.handleEdit}
                        post={this.props.post}
                        toggleEdit={this.toggleEdit}
                />
        ):(
                <Post
                        handleDelete={this.props.handleDelete}
                        post={this.props.post}
                        toggleEdit={this.toggleEdit}
                />
        )
    }
}

export default ReviewContainer
