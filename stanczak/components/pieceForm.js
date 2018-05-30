import React, {Component} from 'react'

export default (props) => {
    const handleSubmit = props.handleSubmit
    const selectedPiece = props.selectedPiece
    const updateField = props.updateField
    const artists = props.artists
    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedPiece ? (<span>Edit </span>) : (<span>Add New </span>)}Artwork</h2>
            <label>Title
            <input name="title" type="text" required value={selectedPiece && selectedPiece.title} onChange={updateField}/>
            </label>
            <label>Medium
            <input name="medium" type="text" value={selectedPiece && selectedPiece.medium} onChange={updateField}/>
            </label>
            <label>Contact
            <input name="contact" type="email" required value={selectedPiece && selectedPiece.contact} onChange={updateField}/>
            </label>
            <label> ImageUrl
            <input name="imageUrl" type="text" value={selectedPiece && selectedPiece.imageUrl} onChange={updateField}/>
            </label>
            <label>Rating
            <input name="rating" type="text" value={selectedPiece && selectedPiece.rating} onChange={updateField}/>
            </label>
            <select name="artistId" value={selectedPiece && selectedPiece.artistId} onChange={updateField}>
                    <option value={'null'} >Select An Artist</option>
                {artists && artists.map(artist => (
                    <option key={artist.id} className="option" value={artist.id}>{artist.name}</option>
                ))}
            </select>
            <label>Image
            <input type="file" name="imageFile" />
            </label>
            <label>Image Name
            <input type="text" name="imageName" onChange={updateField}/>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}
