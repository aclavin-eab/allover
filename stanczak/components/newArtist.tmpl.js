import React from 'react'
import {Link} from 'react-router-dom'
import { Piece, ArtistDisplay, ArtistForm } from './'

export default (props) => {
    const { artists, selectedArtist, editMode, handleSubmit, handleSecondarySubmit, updateField, editPiece, artwork, toggleEdit, deleter, cancel } = props
    return (
        <div className="artistView">
            {!selectedArtist || !selectedArtist.id || editMode ? (
                <ArtistForm selectedArtist={selectedArtist} handleSubmit={handleSubmit}
                    handleSecondarySubmit={handleSecondarySubmit} updateField={updateField}
                    editPiece={editPiece} artwork={artwork}/>
                ) : (
                    <ArtistDisplay selectedArtist={selectedArtist} />
                )
            }
            {selectedArtist && selectedArtist && (
                <div>
                    <button onClick={toggleEdit}>EDIT</button>
                    <button onClick={deleter}>DELETE</button>
                </div>
            )}
            {cancel && (
                <button className="closer" onClick={cancel}>Cancel</button>
            )}
        </div>
    )
}
