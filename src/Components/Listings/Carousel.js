import React, { useState } from "react";
import Slide from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
    return (
            <div>
                 <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button>
                <AutoRotatingCarousel
                        label="Get started"
                        open={handleOpen.open}
                        onClose={() => setHandleOpen({ open: false })}
                        onStart={() => setHandleOpen({ open: false })}
                        autoplay={false}
                        mobile={isMobile}
                        style={{ position: "absolute", zIndex: "1" }}
                >
                    <Slide
                            media={
                                <img src="https://www.fillmurray.com/640/360" />
                            }
                            mediaBackgroundStyle={{ backgroundColor: red[400] }}
                            style={{ backgroundColor: red[600]  }}
                            title="This is a very cool feature"
                            subtitle="Just using this will blow your mind."
                    />
                    <Slide
                            media={
                                <img src="https://loremflickr.com/640/360" />
                            }
                            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                            style={{ backgroundColor: blue[600] }}
                            title="Ever wanted to be popular?"
                            subtitle="Well just mix two colors and your are good to go!"
                    />
                    <Slide
                            media={
                                <img src="http://placeimg.com/640/360/any" />
                            }
                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                            style={{ backgroundColor: green[600] }}
                            title="May the force be with you"
                            subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
                    />
                </AutoRotatingCarousel>
            </div>
    );
};

function Carousel() {
    const [handleOpen, setHandleOpen] = useState({ open: false });
    const handleClick = () => {
        setHandleOpen({ open: true });
    };
    const matches = useMediaQuery("(max-width:600px)");
    return (
            <>
                <Button onClick={handleClick}>Open carousel</Button>
                <AutoRotatingCarouselModal
                        isMobile={matches}
                        handleOpen={handleOpen}
                        setHandleOpen={setHandleOpen}
                />
            </>
    );
}
export default Carousel
