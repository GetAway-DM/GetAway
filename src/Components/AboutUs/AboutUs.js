import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'
import masen from './masen.png'
import matt from './matt.png'
import megan from './megan.png'
import tessa from './tessa.png'

import LinkedInIcon from '@material-ui/icons/LinkedIn'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'

class AboutUs extends Component {


    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Container>
                    <div className="about-us">
                        <h3 className="pages-header"> About Us </h3>
                        <p> Welcome to the Get Away App! The creators of this application make a team of four full stack developers from Devmountain. We are passionate about creating technologies that make life easier. Sharing that frame of mind, we have found a common mission in delivering an application that can help you search for your next vacation rental.</p>
                        <IconButton href="https://github.com/GetAway-DM/GetAway">
                        Checkout our GitHub Repo!
                        <GitHubIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <br />
                    <div className="index-container1">
                        <h3 className="pages-header" id="meet-team"> Meet The Team!</h3>
                        <br />
                        <Row>
                            <Col xs="12" md={{ size: 6, offset: 3 }}>
                            <br />
                                <div className="roundPics">
                                    <img width="20%" src={tessa} alt="Picture of Tessa" />
                                    <p>Hi, my name's Tessa Woodard and I'm a web developer from Colorado. I love making nice, easy to use apps that brighten people's day!</p>
                                        
                                        <IconButton href="https://www.linkedin.com/in/tessa-woodard/">
                                        Feel free to connect on Linkedin!
                                        <LinkedInIcon fontSize="large" />
                                        </IconButton>
                                    
                                </div>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md={{ size: 6, offset: 3 }}>
                            <br />
                                <div className="roundPics">
                                    <img width="20%" src={matt} alt="Picture of Matt" />
                                    <p>Hi! I am Matt McCarthy, a web developer focused on crafting
                                    great web experiences. Coding has been a passion since I first using a
                                    computer.I enjoy creating beautifully desinged intuitive and funcitonal
                                    websites.
                                        
                                        <IconButton href="https://www.linkedin.com/in/matthew-mccarthy-774b331aa/">
                                        Feel free to connect on Linkedin!
                                        <LinkedInIcon fontSize="large" />
                                        </IconButton>
                                    </p>
                                </div>
                                <br />
                            </Col>
                        </Row>
                            <Row>
                                <Col xs="12" md={{ size: 6, offset: 3 }}>
                                <br />
                                    <div className="roundPics">
                                        <img width="20%" src={megan} alt="Picture of Megan" />
                                        <p>Hello! My name is Megan Olsen. I’m a Full Stack Web Developer from Utah. I take the notion of working hard to play hard to heart. I enjoy coding websites that are helpful and fun.</p>
                                        
                                        <IconButton href="https://www.linkedin.com/in/megan-olsen-027ab8132/">
                                        Feel free to connect on Linkedin!
                                        <LinkedInIcon fontSize="large" />
                                        </IconButton>
                                    </div>
                                    <br />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md={{ size: 6, offset: 3 }}>
                                <br />
                                    <div className="roundPics">
                                        <img width="20%" src={masen} alt="Picture of Masen" />
                                        <p>Hey! My name is Masen Funderburk. I'm a web developer from Dallas, TX who is passionate about making efficient and exciting code!</p>

                                        <IconButton href="https://www.linkedin.com/in/masen-funderburk-909aba1ab/">
                                        Feel free to connect on Linkedin!
                                        <LinkedInIcon fontSize="large" />
                                        </IconButton>
                                    </div>
                                    <br />
                                </Col>
                            </Row>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}
export default AboutUs
