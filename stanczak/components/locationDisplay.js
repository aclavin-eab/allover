import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Piece from './piece'


export default (props) => {
    const selectedLocation = props.selectedLocation
    return (
        <div>
            <div className="locationImage"><img src={selectedLocation && selectedLocation.imageUrl}/></div>
            <div className="info">
                <div><h1>{selectedLocation && selectedLocation.title}</h1></div>
                <div>Description: {selectedLocation && selectedLocation.description}</div>
                <div>Longitude: {selectedLocation && selectedLocation.longitude}</div>
                <div>Latitude: {selectedLocation && selectedLocation.latitude}</div>
            </div>
            <div className="locationWorkWrap">
            <h2>ART PIECES</h2>
            <div className="locationWork">
            {selectedLocation && selectedLocation.artworks.length < 1 && (
                <div>No art to be found here</div>
            )}
            {selectedLocation && selectedLocation.artworks.map(art => {
                return <Link to={`/artwork/${art.id}`}><Piece key={art.id} piece={art} /></Link>
            })}
            </div>
            </div>
        </div>
    )
}
