import React, { useEffect, useState } from 'react'

const Item = ({ leftMenuState, module, handleClick, isSubItem }) => (
    <div className="item-wrapper" onClick={handleClick}>
        <span className="item-icon material-icons" title={module.title}>
            {isSubItem ? <div className="hidden sub-item-icon" /> : module.icon}
        </span>
        {leftMenuState.menuClicked && <span className="item-title">{module.title}</span>}
        {leftMenuState.menuClicked && !isSubItem && <span className="material-icons">keyboard_arrow_down</span>}
    </div>
)

const ItemMenu = ({ module = {}, leftMenuState, updateState }) => {
    const [ítemClicked, setItemClicked] = useState(false)

    const handleClick = (id, isSubItem) => {
        leftMenuState = { ...leftMenuState, menuClicked: true}
        if (ítemClicked && isSubItem) {
            updateState({ menuClicked: false })
            setItemClicked(false)
        } else if (ítemClicked) {
            setItemClicked(false)
        } else {
            setItemClicked(true)
        }
    }

    useEffect(() => {
        if (!leftMenuState.menuClicked) {
            setItemClicked(false)
        }
    }, [leftMenuState.menuClicked])

    useEffect(() => {
        console.log("Module: " + module.title)

        return () => {
            console.log('Module ' + module.title +  ' return')
        }
    }, [ítemClicked])

    return (
        <div className='item'>
            <div className="pd-5px-0">
                <Item key={module._id} leftMenuState={leftMenuState} module={module} handleClick={(e) => handleClick(module._id, false)} isSubItem={false} />
                {ítemClicked && <div>
                    {module.modules.map(item => {
                        return (
                            <Item key={item._id} leftMenuState={leftMenuState} module={item} handleClick={(e) => handleClick(module._id, true)} isSubItem={true} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}

export default ItemMenu