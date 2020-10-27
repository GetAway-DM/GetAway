import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class MyListings extends Component{
    constructor(props){
        super(props)
        this.state = {
            listing: {}
        }
    }
    render(props){
        return(
            <div>
                <h1>Listing</h1>
            </div>
        )
    }

}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(MyListings)