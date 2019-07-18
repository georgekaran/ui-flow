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
            {subItems.map(item => <ItemMenu key={item._id} label={item.title} menuClicked={menuClicked} subItems={[]} />)}
        </div>
    )
}

export default ItemMenu