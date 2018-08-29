import React from 'react'
import {Link} from 'react-router-dom'
import Artist from './artist'
import NewArtist from './newArtist'

export default (props) => {
    const {artists, newView, toggleView} = props
    return (
        <div className="artistsWrapper">
            <div className="itemWrapper">
                {artists && artists.map(ar => (
                    <div className="item" key={ar.id}>
                        <Link to={`/artists/${ar.id}`}>
                            <Artist artist={ar} />
                        </Link>
                    </div>
                ))}
                {(artists.length < 1) && (<div>NO ARTISTS FOUND</div>)}
            </div>
            {newView && (
                <NewArtist cancel={toggleView}/>
            )}
            <button className="headerButton" onClick={toggleView}>Add New Artist</button>
        </div>
    )
}
