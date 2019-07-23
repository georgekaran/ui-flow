import React, { useEffect, useState } from 'react'
import { CSSTransitionGroup } from 'react-transition-group' // ES6

const Item = ({ leftMenuState, module, handleClick, isSubModule }) => (
    <div className={leftMenuState.isExpand ? "item-wrapper-expand" : "item-wrapper"} onClick={handleClick}>
        <span className="item-icon material-icons" title={module.title}>
            {isSubModule ? <div className="hidden sub-item-icon" /> : module.icon}
        </span>

        {leftMenuState.isExpand && <span className="item-title">{module.title}</span>}
        {leftMenuState.isExpand && !isSubModule && module._id !== 0 && <span className="material-icons">keyboard_arrow_down</span>}
    </div>
)

const ItemMenu = ({ module = {}, leftMenuState, updateState, updateMenuClicked, className = "" }) => {
    const [ítemClicked, setItemClicked] = useState(false)

    const handleClick = (id, isSubModule) => {
        if (isSubModule) {
            setItemClicked(false)
            updateMenuClicked(false)
        } else {
            setItemClicked(true)
            updateState({ moduleClick: id })
        }
    }

    useEffect(() => {
        if (!leftMenuState.isExpand) {
            setItemClicked(false)
        }
    }, [leftMenuState.isExpand])

    return (
        <div className={className ? `item ${className}` : 'item'}>
            <div className="pd-5px-0">
                <Item key={module._id} leftMenuState={leftMenuState} module={module}
                    handleClick={(e) => handleClick(module._id, false)} isSubModule={false} />
                {ítemClicked && leftMenuState.moduleClick === module._id && <div>
                    {module.modules && module.modules.map(subModule => {
                        return (
                            <Item key={subModule._id} leftMenuState={leftMenuState} module={subModule}
                                handleClick={(e) => handleClick(module._id, true)} isSubModule={true} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}

export default ItemMenu