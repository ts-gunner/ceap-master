import React from 'react'
import "./button1.scss"

type ButtonType = {
    buttonText: string, 
    onClick?: (event: any) => void
}

export default function Button1({buttonText, onClick}: ButtonType) {
    return (
        <div className="btn-animate btn-animate__tear-up-out" onClick={onClick}>
            {buttonText}
        </div>
    )
}
