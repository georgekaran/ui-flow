import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import HomeHeader from '../components/HomeHeader'
import Template from './Template'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <HomeHeader />
                    <Link to="/template">Template</Link>
                    {/* <Carousel autoPlay showThumbs={false} interval={5000} infiniteLoop stopOnHover={false} transitionTime={1500}
                        showIndicators={false} showArrows={false} showStatus={false} className="presentation-mode">
                        <div>
                            <img className="carousel-image" src="images/designer_4x-1.png" alt="carousel-1" />
                            <h3 className="title">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                            <p>Legend 1</p>
                        </div>
                        <div>
                            <img className="carousel-image" src="images/carousel_2.jpg" alt="carousel-2" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img className="carousel-image" src="images/carousel_3.jpg" alt="carousel-3" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel> */}
                </div>
                {/* <div className="container-right">
                    <div className="container container-center">
                        <div className="wrapper-logo">
                            <img src="images/ui-flow-logo.png" width="200" height="120" alt="logo"/>
                        </div>
                    </div>
                </div> */}
            </nav>
        )
    }
}

export default Home