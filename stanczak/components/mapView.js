import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseLocations} from '../store/thunks'
import {clearSelection} from '../store/actions'
import Piece from './piece'
import NewPiece from './newPiece'
import tokens from '../../private'

class MapView extends Component {
    async componentDidMount() {
        await this.props.browseLocations()
        const mymap = L.map('mapid').setView([40.7338452, -73.95652969999999], 17);
        L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 25,
                id: 'mapbox.streets',
                accessToken: tokens.mapToken
        }).addTo(mymap);
        console.log(this.props.locations)
        this.props.locations.map(loc => {
            let m = L.marker([+loc.latitude, +loc.longitude]).addTo(mymap)
            console.log(loc, m)
        })
    }

    render() {
        return (
            <div className="map-wrapper">
             <div id="mapid" className="map large"></div>
             </div>

        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseLocations: () => dispatch(browseLocations()),
        deletePiece: (id) => dispatch(deletePiece(id)),
        clearSelection: () => dispatch(clearSelection())

    }
}
const mapProps = state => {
    return {
        artwork: state.artwork,
        locations: state.locations
    }
}

export default connect(mapProps, mapDispatch)(MapView)
