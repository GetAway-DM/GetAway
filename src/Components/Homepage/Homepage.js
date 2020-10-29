import React, { Component } from 'react'
import Search from './Search'
import './homepage.css'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'

class Homepage extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    if (!this.props.authReducer.isLoggedIn) {
      this.props.getUser().catch((err) => {
        this.props.history.push('/')
      })
    }
    this.props.getUser()
  }

  render() {
    return (
      <div className="homepage-container">
        <div className="homepage_text">Want to Get Away?</div>
        <div className="homepage_text1">Discover new places to stay whether it’s for live, work or just to relax.</div>
        <Search />
      </div>
    )
  }
}

const mapStateToProps = (state) => state
export default connect(mapStateToProps, { getUser })(Homepage)
