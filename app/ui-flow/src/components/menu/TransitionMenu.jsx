import React, { useEffect, useState } from 'react';
import '../../styles/components/menu/leftMenu.css'
import $ from 'jquery';

export default function TransitionMenu({ isClicked = false }) {
    const [divRef, setDivRef] = useState(React.createRef())

    useEffect(() => {
        console.log("Criou")
    }, [])

    useEffect(() => {
        const current = divRef.current;
        current.style.width = isClicked ? '110px' : '50px'
        current.style.height = isClicked ? '110px' : '50px'
    }, [isClicked])

    return (
        <div ref={divRef} className="item-profile">
            <img className="image-profile"
                 src={`http://127.0.0.1:5000/images/f67783fd86b159e1ff6c0b849b68fc7bcb07a3a24ba879a4a7.jpg`} 
                 alt="Profile Pic" />
        </div>
    )
}