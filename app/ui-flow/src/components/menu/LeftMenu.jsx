import React, { useState, useEffect, useRef } from 'react'
import '../../styles/components/menu/leftMenu.css'

import ItemMenu from './ItemMenu'
import ModuleService from '../../service/ModuleService'
import DivTheme from '../div/DivTheme'

export default () => {
    const [isExpand, setExpand] = useState(false)
    const [modules, setModules] = useState([])
    const [moduleClick, setModuleClick] = useState(null)
    const toggleButton = useRef(null);
    window.isExpand = isExpand;

    useEffect(() => {
        async function fetchModulesAsync() {
            await fetchModules();
        }
        fetchModulesAsync();
        handleMouseClick();
    }, [])

    useEffect(() => {
        if (!isExpand) {
            setModuleClick(null)
        }
    }, [isExpand])

    const fetchModules = async () => {
        await ModuleService.getAll().then(resp => {
            const modules = resp.data.modules
            setModules(modules)
        })
    }

    const handleMouseClick = () => {
        document.addEventListener("click", (evt) => {
            const menuLeft = document.getElementById("menu-left");
            let targetElement = evt.target; // clicked element
            if (targetElement == toggleButton.current) {
                setExpand(!window.isExpand)
            } else {
                do {
                    if (targetElement == menuLeft) {
                        // This is a click inside. Do nothing, just return.
                        setExpand(true)
                        return;
                    }
                    // Go up the DOM
                    targetElement = targetElement.parentNode;
                } while (targetElement);
                // This is a click outside.
                setExpand(false)
            }
        });
    }

    return (
        <>
            <DivTheme id="menu-left" levelTheme="l1" className={isExpand ? "menu-left menu-left-expand" : "menu-left"}>
                <div className="menu-left-modules-wrapper">
                    <img className="app-logo" src="http://127.0.0.1:5000/images/logo_teste.png" />
                    {modules.map(module => {
                        return <ItemMenu key={module._id} moduleClick={moduleClick} setModuleClick={setModuleClick}
                                 module={module} isExpand={isExpand} setExpand={setExpand} />
                    })}
                    <div className="line-separator" />
                    <div className={isExpand ? "txt-alg-right left-menu-bottom" : "txt-alg-center left-menu-bottom"} >
                        <span ref={toggleButton} className="material-icons">
                            {isExpand ? "arrow_back_ios" : "arrow_forward_ios"}
                        </span>
                    </div>
                </div>
            </DivTheme>
        </>
    )
}