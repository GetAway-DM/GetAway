import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getUser} from '../../ducks/authReducer';
// https://reactjs.org/docs/hooks-intro.html
class Homepage extends Component{
    constructor(props){
        super(props)
    }

    async componentDidMount(){
        if (!this.props.authReducer.isLoggedIn) {
            this.props.getUser().catch((err) => {
                    this.props.history.push('/')
                }
            )
        }
        this.props.getUser()
        }

    render(){
        return(
            <div>Homepage</div>
        )
    }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, {getUser})(Homepage);
