import React from 'react'
import '../styles/home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container-left">
                    <Carousel autoPlay showThumbs={false} interval={5000} infiniteLoop 
                        showIndicators={false} showArrows={false} showStatus={false} dynamicHeight={true} >
                        <div>
                            <img src="images/carousel_1.jpg" alt="carousel-1" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="images/carousel_2.jpg" alt="carousel-2" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src="images/carousel_3.jpg" alt="carousel-3" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                </div>
                <div className="container-right">
                    <h1>Home</h1>
                </div>
            </nav>
        )
    }
}

export default Home