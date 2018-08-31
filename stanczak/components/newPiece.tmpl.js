import React from 'react'
import {Link} from 'react-router-dom'
import { Piece, PieceDisplay, PieceForm } from './'

export default (props) => {
    const { artists, locations, selectedPiece, editMode, handleSubmit, handleSecondarySubmit, updateField, editPiece, artwork, toggleEdit, deleter, cancel, geolocate } = props
    return (
        <div className="itemView">
            <div className="didact">
                {!selectedPiece || !selectedPiece.id || editMode ? (
                        <PieceForm selectedPiece={selectedPiece}
                        //TODO CREATE THE GEOLOCATER FUNCTION TO PASS IN TO THE FORM
                            updateField={updateField} handleSubmit={handleSubmit} geolocate={geolocate}
                            artists={artists} locations={locations} //addressLookup={addressLookup}
                            />
                    ) : (
                        <PieceDisplay selectedPiece={selectedPiece} />
                    )
                }
                {selectedPiece && selectedPiece && (
                    <div>
                        <button onClick={toggleEdit}>{editMode ? 'CANCEL' : 'EDIT'}</button>
                        <button onClick={deleter}>DELETE</button>
                    </div>
                )}
                {cancel && (
                    <button className="closer" onClick={cancel}>Cancel</button>
                )}
            </div>
            <img src={selectedPiece && selectedPiece.imageUrl}/>
        </div>
    )
}
