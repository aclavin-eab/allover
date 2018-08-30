import React, {Component} from 'react'
import { Piece } from './'

export default (props) => {
    const { selectedLocation, handleSubmit, updateField, handleSecondarySubmit, editPiece, artwork } = props
    return (
        <div className="locationFormWrapper">
            <form onSubmit={handleSubmit}>
                <h2>Add New Location</h2>
                <label>Title
                    <input name="Title" type="text" required value={selectedLocation && selectedLocation.title} onChange={updateField}/>
                </label>
                <label> Description
                    <textarea name="description" type="text" value={selectedLocation && selectedLocation.description} onChange={updateField}></textarea>
                </label>
                <label>latitude
                    <input name="Title" type="text" required value={selectedLocation && selectedLocation.latitude} onChange={updateField}/>
                </label>
                <label>Longitude
                    <input name="Title" type="text" required value={selectedLocation && selectedLocation.longitude} onChange={updateField}/>
                </label>
                <button type="submit">Submit</button>
            </form>
            {selectedLocation && selectedLocation.id && (
                <div>
                    <h3>art</h3>
                    <h4>Tag art with location</h4>
                    <form onSubmit={handleSecondarySubmit}>
                        <select name="artworkToAdd">
                            <option value="null">Choose Work</option>
                            {artwork && artwork.map(art => (
                                <option key={`unowned${art.id}`} value={art.id}>{art.title}</option>
                            )) }
                        </select>
                        <button type="submit">Claim work</button>
                    </form>
                    <h4>Locations work</h4>
                    {selectedLocation && selectedLocation.artworks.length < 1 && (
                        <div>No art to be found here</div>
                    )}
                    <div class="locationWorkWrap">
                        {selectedLocation && selectedLocation.artworks.map(art => (
                            <div className="pieceWrap" key={art.id}><Piece piece={art} /><button onClick={_ => {editPiece({id: art.id, locationId: null})}}>Remove work</button></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
