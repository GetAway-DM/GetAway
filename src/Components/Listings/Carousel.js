import React, { Component } from "react";
import { Slide } from "react-slideshow-image";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import "./carousel.css";
import "react-slideshow-image/dist/styles.css";

class Carousel extends Component {
    constructor() {
        super();
        this.slideRef = React.createRef();
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.state = {
            current: 0
        };
    }

    back() {
        this.slideRef.current.goBack();
    }

    next() {
        this.slideRef.current.goNext();
    }

    render() {
        const properties = {
            duration: 5000,
            autoplay: true,
            transitionDuration: 500,
            arrows: false,
            infinite: true,
            easing: "ease",
            indicators: (i) => <div className="indicator">{i + 1}</div>
        };
        const slideImages = [
            "https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
            "https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
            "https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
            "https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
        ];
        return (
                <div className="App">
                    <div className="slide-container">
                        <Slide ref={this.slideRef} {...properties}>
                            {slideImages.map((each, index) => (
                                    <div key={index} className="each-slide">
                                        <img className="lazy" src={each} alt="sample" />
                                    </div>
                            ))}
                        </Slide>
                    </div>

                    <div className="slide-container buttons">
                        <FaArrowLeft onClick={this.back} type="button" />
                        <FaArrowRight onClick={this.next} type="button"/>
                    </div>
                </div>
        );
    }
}

export default Carousel;
