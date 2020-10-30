import React, { Component } from 'react'
import { Slide } from 'react-slideshow-image'
import axios from 'axios'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './ListingCarousel.css'
import 'react-slideshow-image/dist/styles.css'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.slideRef = React.createRef()
    this.back = this.back.bind(this)
    this.next = this.next.bind(this)
    this.state = {
      current: 0,
      slideImages: [],
    }
  }

  componentDidMount() {
    console.log(this.props)
    const { listing } = this.props
    axios
      .get(`/api/listingphoto/getphotos/${listing}`, [listing])
      .then((res) => {
        this.setState({
          slideImages: res.data,
        })
      })
  }

  back() {
    this.slideRef.current.goBack()
  }

  next() {
    this.slideRef.current.goNext()
  }

  render() {
    const properties = {
      duration: 5000,
      autoplay: true,
      transitionDuration: 500,
      arrows: false,
      infinite: true,
      easing: 'ease',
      indicators: (i) => <div className="indicator">{i + 1}</div>,
    }
    console.log(this.state.slideImages)
    return (
      <div className="App">
        <div className="slide-container">
          <Slide ref={this.slideRef} {...properties}>
            {this.state.slideImages.map((each) => (
              <div key={each.photo_id} className="each-slide">
                <img className="lazy-slide" src={each.photo} alt="sample" />
              </div>
            ))}
          </Slide>
        </div>
        <div className="slide-container buttons">
          <FaArrowLeft onClick={this.back} type="button" />
          <FaArrowRight onClick={this.next} type="button" />
        </div>
      </div>
    )
  }
}

export default Carousel
