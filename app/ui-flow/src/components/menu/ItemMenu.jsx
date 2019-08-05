import React from 'react'
import { withRouter } from "react-router";

const Item = ({ isExpand, module, handleClick, isSubModule }) => (
    <div className={isExpand ? "item-wrapper-expand" : "item-wrapper"} onClick={handleClick}>
        <span className="item-icon material-icons" title={module.title}>
            {isSubModule ? <div className="hidden sub-item-icon" /> : module.icon}
        </span>

        {isExpand && <span className="item-title">{module.title}</span>}
        {isExpand && !isSubModule && module._id !== 0 && <span className="material-icons">keyboard_arrow_down</span>}
    </div>
)

const ItemMenu = (props) => {
    const { module = {}, moduleClick, setModuleClick, isExpand, setExpand, className = "" } = props

    const handleClick = (id, module, isSubModule) => {
        if (isSubModule) {
            setExpand(false)
            props.history.push(module.link)
        } else {
            setModuleClick(id)
        }
    }

    return (
        <div className={className ? `item ${className}` : 'item'}>
            <div className="pd-5px-0">
                <Item key={module._id} 
                      isExpand={isExpand} 
                      module={module}
                      handleClick={(e) => handleClick(module._id, module, false)} 
                      isSubModule={module.modules ? false : true} />
                        {moduleClick === module._id && <div>
                            {module.modules && module.modules.map(subModule => {
                                return (
                                    <Item key={subModule._id} 
                                          isExpand={isExpand} 
                                          module={subModule}
                                          handleClick={(e) => handleClick(module._id, subModule, true)} 
                                          isSubModule={true} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}

export default withRouter(ItemMenu)