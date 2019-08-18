import React from 'react'
import { withRouter } from "react-router";

const Item = ({ isExpand, module, handleClick, isSubModule, moduleClick }) => (
    <div className={isExpand ? "item-wrapper-expand" : "item-wrapper"} onClick={handleClick}>
        <span className="item-icon material-icons" title={module.title}>
            {isSubModule ? <div className="sub-item-icon" /> : module.icon}
        </span>

        {isExpand && <span className="item-title">{module.title}</span>}
        {isExpand &&
            !isSubModule &&
            module.modules.length > 0 &&
            module._id !== 0 &&
            <span className={`material-icons ${moduleClick !== module._id ? 'rotate-90deg' : ''}`}>keyboard_arrow_down</span>}
    </div>
)

const ItemMenu = (props) => {
    const { module = {}, moduleClick, setModuleClick, isExpand, setExpand, className = "" } = props

    const handleClick = (id, module) => {
        if (module.modules.length === 0) {
            setExpand(false)
            props.history.push(module.link)
        } else {
            setModuleClick(moduleClick && id === moduleClick ? null : id)
        }
    }

    return (
        <div className={className ? `item ${className}` : 'item'}>
            <div className="pd-5px-0">
                <Item key={module._id}
                    isExpand={isExpand}
                    module={module}
                    handleClick={(e) => handleClick(module._id, module)}
                    isSubModule={module.modules ? false : true} 
                    moduleClick={moduleClick} />
                {moduleClick === module._id && <div>
                    {module.modules && module.modules.map(subModule => {
                        return (
                            <Item key={subModule._id}
                                isExpand={isExpand}
                                module={subModule}
                                handleClick={(e) => handleClick(module._id, subModule)}
                                isSubModule={true} 
                                moduleClick={moduleClick} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}

export default withRouter(ItemMenu)