import React from 'react'
import {Link} from 'react-router-dom'
import { Piece, LocationDisplay, LocationForm } from './'

export default (props) => {
    const { artists, selectedLocation, editMode, handleSubmit, handleSecondarySubmit, updateField, editPiece, artwork, toggleEdit, deleter, cancel } = props
    return (
        <div className="locationView">
            {!selectedLocation || !selectedLocation.id || editMode ? (
                <LocationForm selectedLocation={selectedLocation} handleSubmit={handleSubmit}
                    handleSecondarySubmit={handleSecondarySubmit} updateField={updateField}
                    editPiece={editPiece} artwork={artwork}/>
                ) : (
                    <LocationDisplay selectedLocation={selectedLocation} />
                )
            }
            {selectedLocation && selectedLocation && (
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
