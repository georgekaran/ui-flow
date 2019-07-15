import React from 'react'

const HomeHeader = () => {
    return (
        <header className="menu-header">
            <ul className="menu-top">
                <li>
                    <img className="carousel-image" width={100} height={60} src="images/ui-flow-logo.png" alt="carousel-1" />
                </li>
                <li>PROJETO</li>
                <li>PROJETO</li>
                <li>PROJETO</li>
                <li className="social-media">Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
            </ul>
        </header>
    )
}

export default HomeHeader