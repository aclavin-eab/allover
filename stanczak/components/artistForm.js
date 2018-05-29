import React, {Component} from 'react'
import Piece from './piece'

export default (props) => {
    const selectedArtist = props.selectedArtist
    const handleSubmit = props.handleSubmit
    const updateField = props.updateField
    const handleSecondarySubmit = props.handleSecondarySubmit
    const editPiece = props.editPiece
    const artwork = props.artwork
    return (
        <div>
        <form onSubmit={handleSubmit}>
        <h2>Add New Artist</h2>
        <label>Name
        <input name="name" type="text" required value={selectedArtist && selectedArtist.name} onChange={updateField}/>
        </label>
        <label>Origin
        <input name="origin" type="text" value={selectedArtist && selectedArtist.origin} onChange={updateField}/>
        </label>
        <label>ImageUrl
        <input name="imageUrl" type="text" value={selectedArtist && selectedArtist.imageUrl} onChange={updateField}/>
        </label>
        <label> Bio
        <textarea name="bio" type="text" value={selectedArtist && selectedArtist.bio} onChange={updateField}></textarea>
        </label>
        <button type="submit">Submit</button>
        </form>
        {selectedArtist && selectedArtist.id && (
            <div>
            <h3>art</h3>
            <h4>Add art to artist</h4>

        <form onSubmit={handleSecondarySubmit}>
            <select name="artworkToAdd">
                {artwork && artwork.map(art => (
                    <option key={`unowned${art.id}`} value={art.id}>{art.title}</option>
                )) }
            </select>
            <button type="submit">Claim work</button>
        </form>
        <h4>Artists work</h4>
        {selectedArtist && selectedArtist.artworks.length < 1 && (
            <div>No art to be found here</div>
        )}
        {selectedArtist && selectedArtist.artworks.map(art => (
            <div key={art.id}><Piece piece={art} /><button onClick={_ => {editPiece({id: art.id, artistId: null})}}>Remove work</button></div>
        ))}
        </div>
        )
        }

        </div>
    )
}
