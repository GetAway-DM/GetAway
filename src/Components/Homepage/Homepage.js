import React, { Component } from 'react'
import Search from './Search'
import './homepage.css'

class Homepage extends Component{
    render(){
        return(
            <div>
                <p>Homepage</p>
                <Search/>
            </div>
        )
    }
}
export default Homepage;
