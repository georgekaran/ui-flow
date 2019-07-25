import React from 'react'

import LeftMenu from '../components/menu/LeftMenu'

class Template extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="flex">
                <LeftMenu />
                <div>
                    asdas
                </div>
            </div>
        )
    }
}

export default Template