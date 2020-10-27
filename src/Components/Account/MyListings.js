import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class MyListings extends Component{
    constructor(props){
        super(props)
        this.state = {
            listing: {},
            amenities: {},
            photos: []
        }
    }
    async componentDidMount(){
        const {listing_id} = this.props.listing
        await this.setState({
            listing: this.props.listing
        })
        await axios.get(`/api/listing/amenities/${listing_id}`).then((res) => {
            this.setState({
                amenities: res.data
            })
        })
        
    }

    deleteListing = () => {
        axios.delete(`/api/listing/deletelisting/${this.state.listing.listing_id}`).then(window.location.reload())
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