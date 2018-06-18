import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import tokens from '../../private'
import Geolocate from '../utilities/geolocate'

class SmallMap extends Component {
    async componentDidMount() {
        const mymap = L.map('locatemap').setView([40.7338452, -83.95652969999999], 2);
        L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 25,
                id: 'mapbox.streets',
                accessToken: tokens.mapToken
        }).addTo(mymap);
        let m = L.marker([40.7338452, 40.7338452], {draggable: true}).addTo(mymap)
        const position = await Geolocate();
        if(position && position.coords && position.coords.latitude){
            mymap.setView([position.coords.latitude, position.coords.longitude], 17);
            let j = L.marker([position.coords.latitude, position.coords.longitude], {draggable: true}).addTo(mymap)
        }
    }

    render() {
        return (
            <div className="map-wrapper small">
                ONPAGE
             <div id="locatemap" className="map"></div>
             </div>

        )
    }
}

const mapDispatch = dispatch => {
    return {

    }
}
const mapProps = state => {
    return {

    }
}

export default connect(mapProps, mapDispatch)(SmallMap)
