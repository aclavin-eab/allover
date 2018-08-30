import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Piece } from './'

export default (props) => {
    const selectedArtist = props.selectedArtist
    return (
        <div>
            <div className="artistImage"><img src={selectedArtist && selectedArtist.imageUrl}/></div>
            <div className="info">
                <div><h1>{selectedArtist && selectedArtist.name}</h1></div>
                <div>Origin: {selectedArtist && selectedArtist.origin}</div>
                <div>Bio: {selectedArtist && selectedArtist.bio}</div>
            </div>
            <div className="artistWorkWrap">
            <h2>ART PIECES</h2>
            <div className="artistWork">
            {selectedArtist && selectedArtist.artworks.length < 1 && (
                <div>No art to be found here</div>
            )}
            {selectedArtist && selectedArtist.artworks.map(art => {
                return <Link to={`/artwork/${art.id}`}><Piece key={art.id} piece={art} /></Link>
            })}
            </div>
            </div>
        </div>
    )
}
