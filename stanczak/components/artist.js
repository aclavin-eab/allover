import React, {Component} from 'react'

export default (props) => {
    const artist = props.artist
    return (
        <div><span>{artist.name}</span><div className="imageStretcher" style={{backgroundImage: `url(${artist.imageUrl})`}}></div></div>
    )
}
