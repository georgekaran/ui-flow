import React, { useContext } from 'react'
import { TemplateContext } from '../../context/template-context'
import '../../styles/pages/template.css'

import { removePropertyFromObject } from '../../util/objectUtil'

export default function DivTheme(props) {
    console.log(props)
    const { levelTheme } = props
    const { templateState } = useContext(TemplateContext)

    return (
        <div {...removePropertyFromObject(props, ["levelTheme"])} 
            className={`${props.className !== null ? props.className : ''} ${templateState.darkMode ? 'dark-theme' : 'light-theme'} ${levelTheme}`} >
            
        </div>
    )
}
