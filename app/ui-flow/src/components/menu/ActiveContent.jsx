import React, { useState, useEffect, useContext } from 'react'

import SimpleTest from '../../components/tests/SimpleTest';
import SimpleTest2 from '../../components/tests/SimpleTest2';
import TemplateContext from '../../context/template-context'
import Dashboard from '../../pages/Dashboard';

export default function ActiveContent({ activeTab}) {
    const { templateState } = useContext(TemplateContext)
    const [state, setState] = useState({ routes: [<Dashboard path="/dashboard" />,
                                                  <SimpleTest2 path="/outro-teste" />,
                                                  <SimpleTest path="/teste" />,
                                                 ] });
    

    useEffect(() => {
        console.log("Component did mount")

        return () => console.log("Component did unmount")
    }, [])

    const updateActiveTab = (activeTab) => {
        setState({ ...state, activeTab })
    }

    return (
        <>
            {state.routes.filter(route => templateState.activeTab === route.props.path)}
        </>
    )
}