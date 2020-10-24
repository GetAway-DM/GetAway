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
      <div>
        <p>Homepage</p>
        <Search />
      </div>
    )
  }
}

const mapStateToProps = (state) => state
export default connect(mapStateToProps, { getUser })(Homepage)