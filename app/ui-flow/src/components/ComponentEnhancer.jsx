import React, { useState, useEffect, useMemo } from 'react'

import { TemplateContext, MenuLeftContext } from '../context/template-context'

export default function ComponentEnhancer(WrappedComponent) {
    return function Template(props) {
        const [templateState, setTemplateState] = useState({ activeTab: "/dashboard" });

        return (
            <TemplateContext.Provider value={{ templateState, setTemplateState }}>
                <div className="flex">
                    <WrappedComponent {...props} />
                </div>
            </TemplateContext.Provider>
        )
    }
}
 