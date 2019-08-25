import React from 'react'
import { connect } from 'react-redux'
import '../../styles/pages/template.css'

import { removePropertyFromObject } from '../../util/objectUtil'

function DivTheme(props) {
    const { darkMode, levelTheme } = props

    return (
        <div {...removePropertyFromObject(props, ["levelTheme"])}
            className={`${props.className !== null ? props.className : ''} ${darkMode ? 'dark-theme' : 'light-theme'} ${levelTheme}`} >
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        darkMode: state.user.darkMode,
        ...props
    }
}

export default connect(mapStateToProps)(DivTheme)