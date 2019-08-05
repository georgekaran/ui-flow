import React from 'react'

import { TemplateContext } from '../context/template-context'
import LeftMenu from '../components/menu/LeftMenu'
class Template extends React.Component {

    state = {
        activeTab: "/dashboard"
    };

    constructor(props) {
        super(props)
    }

    updateState = (updates) => {
        this.setState({ ...this.state, ...updates })
    }

    render() {
        return (
            <TemplateContext.Provider value={{ templateState: this.state, setTemplateState: this.updateState }}>
                <div className="flex">
                    <LeftMenu activeTab={this.state.activeTab} />
                    <div>
                    </div>
                </div>
            </TemplateContext.Provider>
        )
    }
}

export default Template