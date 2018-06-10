import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseLocations} from '../store/thunks'
import {clearSelection} from '../store/actions'
import Piece from './piece'
import NewPiece from './newPiece'
import tokens from '../../private'
import Geolocate from '../utilities/geolocate'

class MapView extends Component {
    async componentDidMount() {
        const mymap = L.map('mapid').setView([40.7338452, -83.95652969999999], 6);
        L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 25,
                id: 'mapbox.streets',
                accessToken: tokens.mapToken
        }).addTo(mymap);
        await this.props.browseLocations()
        this.props.locations.map(loc => {
            if(loc.artworks && loc.artworks[0]){
                let myIcon = L.icon({
                    iconUrl: loc.artworks[0].imageUrl,
                    riseOnHover: true
                })
                let link = `/artwork/${loc.artworks[0].id}`
                if(loc.artworks[1]){
                    console.log("IN HERE")
                    link = `/locations/${loc.id}`
                }
                let popContent = <Link to={link}>
                    <Piece piece={loc.artworks[0]} />
                </Link>
                let m = L.marker([+loc.latitude, +loc.longitude], {icon: myIcon}).addTo(mymap)
                m.bindPopup(`<a href="${link}">${loc.artworks[0].title}!</a>`)
            }
        })
        const position = await Geolocate();
        mymap.setView([position.coords.latitude || 30.7338452, position.coords.longitude || -83.95652969999999], 17);
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
