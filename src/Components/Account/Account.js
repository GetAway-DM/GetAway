import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      profile_img: '',
      emailEdit: false,
      nameEdit: false,
      profile_imgEdit: false,
      isUploading: false,
    }
  }

  async componentDidMount() {
    if (!this.props.authReducer.isLoggedIn) {
      this.props.getUser().catch((err) => {
        this.props.history.push('/')
      })
    }
    this.props.getUser().then((res) => {
      this.setState({
        email: this.props.authReducer.user.email,
        first_name: this.props.authReducer.user.first_name,
        last_name: this.props.authReducer.user.last_name,
        profile_img: this.props.authReducer.user.profile_img,
      })
    })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  toggleEdit = (e) => {
    this.setState({
      [e.target.name]: !this.state.value,
    })
  }
  toggleCancel = (e) => {
    this.setState({
      [e.target.name]: false,
    })
  }

  handleEdit = () => {
    const { email, first_name, last_name, profile_img } = this.state
    const { user_id } = this.props.authReducer.user
    axios.put('/api/user/edit', { user_id, email, first_name, last_name, profile_img }).then((res) => {
      this.props.getUser().then((res) => {
        this.setState({
          email: this.props.authReducer.user.email,
          first_name: this.props.authReducer.user.first_name,
          last_name: this.props.authReducer.user.last_name,
          profile_img: this.props.authReducer.user.profile_img,
        })
      })
    })
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
        this.setState({ isUploading: false, profile_img: url })
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch((err) => {
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

<<<<<<< HEAD
    render(props) {
        const {email, first_name, last_name, profile_img, user_id} = this.props.authReducer.user
        return (
            <div className="accountcontainer">
                <div >Account Details</div>
                <div className="infocontainer">
                    <p>Email: {email}</p>
                    <div className="email_edit">
                    { this.state.emailEdit === false ? <button name="emailEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button> :
                         <div>
                            <input value={this.state.email} onChange={(e) => {
                                this.handleInput(e)
                            }} name="email" placeholder="New Email"/><button name="emailEdit" onClick={(e)=> {this.toggleCancel(e)}}>Cancel</button>
                        </div>}
                    </div>
                    <p>Name: {first_name} {last_name}</p>
                    <div className="name_edit">
                    { this.state.nameEdit === false ? <button name="nameEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button> :
                         <div><input value={this.state.first_name} onChange={(e) => {
                            this.handleInput(e)
                        }} name="first_name" placeholder="First Name"/>  <input value={this.state.last_name} onChange={(e) => {
                            this.handleInput(e)
                        }} name="last_name" placeholder="Last Name"/><button name="nameEdit" onClick={(e)=> {this.toggleCancel(e)}}>Cancel</button></div> }
                    </div>
                    <p>Profile Picture: <img src={`${profile_img}`} alt="Not Loading"/></p>
                    <div className="profile_img_edit">
                        { this.state.profile_imgEdit === false ? <button name="profile_imgEdit" onClick={(e)=> {this.toggleEdit(e)}}>Edit</button> :  <div>
                            <input value={this.state.profile_img} onChange={(e) => {
                                this.handleInput(e)
                            }} name="profile_img" placeholder="New Profile Picture"/>
                            <button name="profile_imgEdit" onClick={(e)=> {this.toggleCancel(e)}}>Cancel</button>
                        </div> }
                    </div>
                    {this.state.emailEdit === true || this.state.nameEdit === true || this.state.profile_imgEdit === true ? <button onClick={(e) => {this.handleSubmit(e)} }>Submit Edit</button> : null}
                </div>
                <button onClick={(e) => {this.props.history.push('/createlisting')}}>Create A Listing</button>
                <button onClick={(e) => {this.props.history.push(`/reservations/${user_id}`)}}>My Reservations</button>
                <div> Reset Password Goes here!!!!</div>
                    <div>Listings, and Favorites will go here.</div>
            </div>
 
        )
    }
=======
  handleSubmit = (e) => {
    e.preventDefault()
    this.handleEdit()
    this.setState({
      emailEdit: false,
      nameEdit: false,
      profile_imgEdit: false,
    })
  }
  //test//

  render(props) {
    const { url, isUploading } = this.state
    const { email, first_name, last_name, profile_img, user_id } = this.props.authReducer.user
    return (
      <div className="accountcontainer">
        <div>Account Details</div>
        <div className="infocontainer">
          <p>Email: {email}</p>
          <div className="email_edit">
            {this.state.emailEdit === false ? (
              <button
                name="emailEdit"
                onClick={(e) => {
                  this.toggleEdit(e)
                }}>
                Edit
              </button>
            ) : (
              <div>
                <input
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                  name="email"
                  placeholder="New Email"
                />
                <button
                  name="emailEdit"
                  onClick={(e) => {
                    this.toggleCancel(e)
                  }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <p>
            Name: {first_name} {last_name}
          </p>
          <div className="name_edit">
            {this.state.nameEdit === false ? (
              <button
                name="nameEdit"
                onClick={(e) => {
                  this.toggleEdit(e)
                }}>
                Edit
              </button>
            ) : (
              <div>
                <input
                  value={this.state.first_name}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                  name="first_name"
                  placeholder="First Name"
                />{' '}
                <input
                  value={this.state.last_name}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                  name="last_name"
                  placeholder="Last Name"
                />
                <button
                  name="nameEdit"
                  onClick={(e) => {
                    this.toggleCancel(e)
                  }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <p>
            Profile Picture: <img src={`${profile_img}`} alt="Not Loading" />
          </p>
          <div className="profile_img_edit">
            {this.state.profile_imgEdit === false ? (
              <button
                name="profile_imgEdit"
                onClick={(e) => {
                  this.toggleEdit(e)
                }}>
                Edit
              </button>
            ) : (
              <div>
                <h1>Upload</h1>
                <h1>{url}</h1>
                <img src={url} alt="" width="450px" />
                <Dropzone onDropAccepted={this.getSignedRequest} accept="image/*" multiple={false}>
                  {({ getRootProps, getInputProps }) =>
                    isUploading ? (
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
                <button
                  name="profile_imgEdit"
                  onClick={(e) => {
                    this.toggleCancel(e)
                  }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          {this.state.emailEdit === true || this.state.nameEdit === true || this.state.profile_imgEdit === true ? (
            <button
              onClick={(e) => {
                this.handleSubmit(e)
              }}>
              Submit Edit
            </button>
          ) : null}
        </div>
        <button
          onClick={(e) => {
            this.props.history.push('/createlisting')
          }}>
          Create A Listing
        </button>
        <button
          onClick={(e) => {
            this.props.history.push(`/reservations/${user_id}`)
          }}>
          My Reservations
        </button>
        <div> Reset Password Goes here!!!!</div>
        <div>Listings, Reservations and Favorites will go here.</div>
      </div>
    )
  }
>>>>>>> main
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps, { getUser })(Account)
