import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Piece from './piece'

export default (props) => {
    const selectedArtist = props.selectedArtist
    return (
        <div>
            <div><h1>{selectedArtist && selectedArtist.name}</h1></div>
            <div>Origin: {selectedArtist && selectedArtist.origin}</div>
            <div>Bio: {selectedArtist && selectedArtist.bio}</div>
            <h2>ART PIECES</h2>
            {selectedArtist && selectedArtist.artworks.length < 1 && (
                <div>No art to be found here</div>
            )}
            {selectedArtist && selectedArtist.artworks.map(art => {
                return <Link to={`/artwork/${art.id}`}><Piece key={art.id} piece={art} /></Link>
            })}
            <div>Artist Picture: <img src={selectedArtist && selectedArtist.imageUrl}/></div>
        </div>
    )
}
