import React, { Component } from 'react'
import { Slide } from 'react-slideshow-image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import './photo.css'
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios'

class Photo extends Component {
  constructor() {
    super()
    this.slideRef = React.createRef()
    this.back = this.back.bind(this)
    this.next = this.next.bind(this)
    this.state = {
      current: 0,
    }
  }

  back() {
    this.slideRef.current.goBack()
  }

  next() {
    this.slideRef.current.goNext()
  }
  deletePhoto = (photo_id) => {
    axios
      .delete(`/api/listingphoto/deletephoto/${photo_id}`)
      .then(window.location.reload())
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
    const slideImages = this.props.photos
    return (
      <div className="App">
        <div className="slide-container">
          <Slide ref={this.slideRef} {...properties}>
            {slideImages.map((each, index) => (
              <div key={index} className="each-slide">
                <img className="lazy" src={each.photo} alt="sample" />
                <IconButton
                  onClick={(e) => {
                    this.deletePhoto(each.photo_id)
                  }}
                  aria-label="delete">
                  <DeleteIcon
                    style={{
                      zIndex: '2',
                    }}
                  />
                </IconButton>
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

export default Photo
