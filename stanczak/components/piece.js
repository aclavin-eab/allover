import React, {Component} from 'react'

export default (props) => {
    const piece = props.piece
    return (
        <div>
        <div className="imageStretcher" style={{backgroundImage: `url(${piece.imageUrl})`}}></div>
        <div >{piece.title}</div>
        </div>
    )
}
