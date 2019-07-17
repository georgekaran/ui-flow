import React, { useEffect, useState } from 'react'

const ItemMenu = ({ label = 'Teste', menuClicked = false, subItems = [] }) => {

    const handleClick = (e) => {
        if (menuClicked) {
            console.log('menu is clicked')
        } else {
            console.log('menu is not clicked')
        }
    }

    return (
        <div className='item' onClick={handleClick}>
            <span>{label}</span>
            {(Array.isArray(subItems) && subItems.length) && subItems.map(item => <ItemMenu label={item} menuClicked={menuClicked} subItems={[]} />)}
        </div>
    )
}

export default ItemMenu