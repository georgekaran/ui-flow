import React, { useState, useEffect, useMemo } from 'react'

import TemplateContext from '../context/template-context'
import LeftMenu from '../components/menu/LeftMenu'

export default function ComponentEnhancer(WrappedComponent) {
    return function Template(props) {
        const [templateState, setTemplateState] = useState({ activeTab: "/dashboard" });

        useEffect(() => {
            console.log("Estado mudou")
            console.log("Props: ", props)

            return () => console.log("Estado return")
        }, [templateState])

        return (
            <TemplateContext.Provider value={{ templateState, setTemplateState }}>
                <div className="flex">
                    <WrappedComponent {...props} />
                </div>
            </TemplateContext.Provider>
        )
    }
}
