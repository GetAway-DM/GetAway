import React, {Component} from 'react'
import { connect } from 'react-redux';

class Photo extends Component {
    constructor(props){
        super(props)
        this.state= {
            photo: {}
        }
    }
    async componentDidMount(){
        const photo = this.props.photo
        await this.setState({
            photo
        })
    }
    render(props){
        const {photo} = this.state.photo
        return(
            <div>
                <img src={photo} alt="not visible"/>
            </div>
        )
    }

}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(Photo)