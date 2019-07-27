import React from 'react'

import LeftMenu from '../components/menu/LeftMenu'

class Template extends React.Component {

    state = {
        activeTab: "/dashboard"
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="flex">
                <LeftMenu activeTab={this.state.activeTab} />
                <div>
                    asdas
                </div>
            </div>
        )
    }
}

export default Template