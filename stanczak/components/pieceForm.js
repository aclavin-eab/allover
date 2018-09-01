import React, {Component} from 'react'
import SmallMap from './smallMap'

export default (props) => {
    const { handleSubmit, selectedPiece, updateField, artists, locations, addressLookup }  = props
    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedPiece && selectedPiece.id ? (<span>Edit </span>) : (<span>Add New </span>)}Artwork</h2>
            <label>Title
            <input name="title" type="text" required value={selectedPiece && selectedPiece.title} onChange={updateField}/>
            </label>
            <label>Medium
            <input name="medium" type="text" value={selectedPiece && selectedPiece.medium} onChange={updateField}/>
            </label>
            <select name="artistId" value={selectedPiece && selectedPiece.artistId} onChange={updateField}>
                    <option value={'null'} >Select An Artist</option>
                {artists && artists.map(artist => (
                    <option key={artist.id} className="option" value={artist.id}>{artist.name}</option>
                ))}
            </select>
            <label>Contact
            <input name="contact" type="email" required value={selectedPiece && selectedPiece.contact} onChange={updateField}/>
            </label>
            <label> ImageUrl
            <input name="imageUrl" type="text" value={selectedPiece && selectedPiece.imageUrl} onChange={updateField}/>
            </label>
            <label>Rating
            <input name="rating" type="text" value={selectedPiece && selectedPiece.rating} onChange={updateField}/>
            </label>
            <label>Image
            <input type="file" name="imageFile" onChange={updateField}/>
            </label>
            <label>Image Name
            <input type="text" name="imageName" onChange={updateField}/>
            </label>
            <select name="locationId" value={selectedPiece && selectedPiece.locationId} onChange={updateField}>
                    <option value={'null'} >Select A Location</option>
                {locations && locations.map(local => (
                    <option key={local.id} className="option" value={local.id}>{local.title ? local.title : local.longitude + 'E ' + local.latitude + "N "}</option>
                ))}
            </select>
            <button type="button" onClick={props.geolocate}>Geolocate me!</button>
            <SmallMap />
            <label>Longitude
            <input type="text" name="longitude" value={selectedPiece && selectedPiece.longitude} onChange={updateField}/>
            </label>
            <label>Latitude
            <input type="text" name="latitude" value={selectedPiece && selectedPiece.latitude} onChange={updateField}/>
            </label>
            <label>Location Title
            <input type="text" name="loctitle" value={selectedPiece && selectedPiece.loctitle} onChange={updateField}/>
            </label>
            <label>Location Description
            <input type="text" name="locdescription" value={selectedPiece && selectedPiece.locdescription} onChange={updateField}/>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}
