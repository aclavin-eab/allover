import React from 'react'

export default (props) => {
    const piece = props.piece
    return (
        <div className="piece">
            <div className="imageStretcher" style={{backgroundImage: `url(${piece.imageUrl})`}}></div>
            <span className="text">{piece.title}</span>
        </div>
    )
}
