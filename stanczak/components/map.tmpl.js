import React from 'react'

export default (props) => {
    return (
        <div className={`${props.type} map-wrapper`}>
            <div id="mapid" className="map"></div>
        </div>
    )
}
