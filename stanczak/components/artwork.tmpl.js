import React from 'react'
import {Link} from 'react-router-dom'
import { Piece, NewPiece} from './'

export default (props) => {
    const {artwork, deletePiece, newView, toggleView} = props
    return (
        <div className="artworkWrapper">
        <div className="itemWrapper">
            {artwork && artwork.map(piece => (
                <div className="item" key={piece.id}>
                    <Link to={`/artwork/${piece.id}`}>
                        <Piece piece={piece} />
                    </Link>
                </div>
            ))}
            {(artwork.length < 1) && (<div>NO ARTWORKS FOUND</div>)}
        </div>
        {newView && (
            <NewPiece cancel={toggleView}/>
        )}
        <button className="headerButton" onClick={toggleView}>Add New Piece</button>
        </div>
    )
}
