import React, {Component} from 'react'

export default (props) => {
    const selectedPiece = props.selectedPiece
    return (
        <div>
            <div><h1>{selectedPiece && selectedPiece.title}</h1></div>
            <div>Medium: {selectedPiece && selectedPiece.medium}</div>
            <div>Contact: {selectedPiece && selectedPiece.contact}</div>
            <div>Rating: {selectedPiece && selectedPiece.rating}</div>
            <div>By: {selectedPiece && selectedPiece.artist && (
                <Link to={`/artists/${selectedPiece.artist.id}`}>{selectedPiece.artist.name}</Link>
            ) || 'artist unknown'}</div>

        </div>
    )
}
