import React, {Component} from 'react'

export default (props) => {
    const artist = props.artist
    return (
        <div>{artist.name}</div>
    )
}
