import React from 'react'
import './KeyButton.scss'

export interface IButton {
    key: string
    value: string
    class?: string
    isOperator?: boolean
}

interface IKeyButton {
    children: React.ReactElement | string
    className?: string
    button: IButton
    onClick: (value: IButton) => void
}

const KeyButton = (props: IKeyButton) => {
    const { children, className, button, onClick } = props
    return (
        <div
            className={`keyboard-key ${className ? className : ''}`}
            onClick={() => onClick(button)}
        >
            {children}
        </div>
    )
}

export {
    KeyButton
}