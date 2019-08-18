import React from 'react'
import DivTheme from './div/DivTheme'

export default function ComponentEnhancer(WrappedComponent) {
    return function Template(props) {
        return (
            <DivTheme className="flex width-100" levelTheme="l2">
                <WrappedComponent {...props} />
            </DivTheme>
        )
    }
}
