import React from 'react'
import {Link} from 'react-router-dom'
import { Artist, NewLocation } from './'

export default (props) => {
    const {locations, deletePiece, newView, toggleView} = props
    return (
        <div className="locationsWrapper">
            <div className="itemWrapper">
                {locations && locations.map(loc => (
                    <Link to={`/locations/${loc.id}`}>
                    <div className="item" key={loc.id}>
                        {loc.title ? (<h2>{loc.title}</h2>) : (
                            <div>
                                <div>Latitude: <span>{loc.latitude}</span></div>
                                <div>Longitude: <span>{loc.longitude}</span></div>
                            </div>
                        )}
                    </div>
                    </Link>
                ))}
                {(locations.length < 1) && (<div>NO LOCATIONS FOUND</div>)}
            </div>
            {newView && (
                <NewLocation cancel={toggleView}/>
            )}
            <button className="headerButton" onClick={toggleView}>Add New Location</button>
        </div>
    )
}
