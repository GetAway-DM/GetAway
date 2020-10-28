import React, { Component } from 'react'
import { Slide } from 'react-slideshow-image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import '../Listings/carousel.css'
import 'react-slideshow-image/dist/styles.css'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import { v4 as randomString } from 'uuid'
import axios from 'axios'

class AddPhoto extends Component {
  constructor(props) {
    super(props)
    this.slideRef = React.createRef()
    this.state = {
      current: 0,
      photo_url: '',
      isUploading: false,
    }
  }

  back = () => {
    this.slideRef.current.goBack()
  }

  next = () => {
    this.slideRef.current.goNext()
  }

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true })
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
    console.log(fileName)
    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/sign-s3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then((response) => {
        console.log('hit')
        const { signedRequest, url } = response.data
        this.uploadFile(file, signedRequest, url)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    }

    axios
      .put(signedRequest, file, options)
      .then((response) => {
        this.setState({ isUploading: false, photo_url: url })
        this.props.addPhoto(url)
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })

      .catch((err) => {
        console.log(err)
        this.setState({
          isUploading: false,
        })
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          )
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`)
        }
      })
  }

  render() {
    const properties = {
      duration: 15000,
      autoplay: true,
      transitionDuration: 500,
      arrows: false,
      infinite: true,
      easing: 'ease',
      indicators: (i) => <div className="indicator">{i + 1}</div>,
    }
    return (
      <div className="App">
        <h3>Add photos</h3>
        <div className="slide-container">
          <Slide ref={this.slideRef} {...properties}>
            {this.props.uploadPhoto.map((each, index) => (
              <div key={index} className="each-slide">
                <img className="lazy" src={each} alt="sample" />
              </div>
            ))}
          </Slide>
        </div>

        <div className="slide-container buttons">
          <FaArrowLeft onClick={this.back} type="button" />
          <FaArrowRight onClick={this.next} type="button" />
        </div>
        <Dropzone onDropAccepted={this.getSignedRequest} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) =>
            this.state.isUploading ? (
              <GridLoader />
            ) : (
              <section
                style={{
                  position: 'relative',
                  width: 200,
                  height: 200,
                  borderWidth: 7,
                  marginTop: 100,
                  borderColor: 'rgb(102, 102, 102)',
                  borderStyle: 'dashed',
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 28,
                }}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )
          }
        </Dropzone>
      </div>
    )
  }
}

export default AddPhoto