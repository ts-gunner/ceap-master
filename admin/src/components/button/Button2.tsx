import React from 'react'
import "./button2.scss"

type ButtonType = {
    buttonText: string, 
    onClick?: (event: any) => void
}

export default function Button2({buttonText, onClick}: ButtonType) {
    return (
        <div className="btn-animate btn-animate__rectangle-out" onClick={onClick}>
            {buttonText}
        </div>
    )
}
