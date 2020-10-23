import React, {Component} from 'react';
import './reviews.css'

class Reviews extends Component {
    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: [
                {id: 1, author: "mickey", body: "The house was dirty"},
                {id: 2, author: "susie", body: "Roaches everywhere"},
                {id: 3, author: "rosco", body: "Pulled up to the address and it was an empty field, I want my money back"}
            ]
        };
    }

    render () {
        const comments = this._getComments();
        let commentNodes;
        let buttonText = 'Show Review';

        if (this.state.showComments) {
            buttonText = 'Hide Review';
            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return(
                <div className="comment-box">
                    <h2>Please leave a Review!</h2>
                    <CommentForm addComment={this._addComment.bind(this)}/>
                    <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
                        {buttonText}
                    </button>
                    <h4 className="comment-count">
                        {this._getCommentsTitle(comments.length)}
                    </h4>
                    {commentNodes}
                </div>
        );
    } // end render

    _addComment(author, body) {
        const comment = {
            id: this.state.comments.length + 1,
            author,
            body
        };
        this.setState({ comments: this.state.comments.concat([comment]) });
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _getComments() {
        return this.state.comments.map((comment) => {
            return (
                    <Comment
                            author={comment.author}
                            body={comment.body}
                            key={comment.id} />
            );
        });
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No Reviews yet';
        } else if (commentCount === 1) {
            return "1 Review";
        } else {
            return `${commentCount} Reviews`;
        }
    }
} // end CommentBox component

class CommentForm extends Component {
    render() {
        return (
                <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                    <div className="comment-form-fields">
                        <input placeholder="Name" required ref={(input) => this._author = input}></input><br />
                        <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
                    </div>
                    <div className="comment-form-actions">
                        <button type="submit">Write Review</button>
                    </div>
                </form>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();
        let author = this._author;
        let body = this._body;
        this.props.addComment(author.value, body.value);
    }
}

class Comment extends Component {
    render () {
        return(
                <div className="comment">
                    <p className="comment-header">{this.props.author}</p>
                    <p className="comment-body">- {this.props.body}</p>
                    <div className="comment-footer">
                        <a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Review</a>
                    </div>
                </div>
        );
    }
    _deleteComment() {
        alert("Need to connect to backend");
    }
}

export default Reviews

