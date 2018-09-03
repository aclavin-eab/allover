import React, {Component} from 'react'
import {Route, Link, Switch, Redirect, withRouter} from 'react-router-dom'
import Artwork from './components/artwork'
import Artists from './components/artists'
import NewPiece from './components/newPiece'
import NewArtist from './components/newArtist'
import NewLocation from './components/newLocation'
import Nav from './components/nav'
import Footer from './components/footer'
import MapView from './components/mapView'
import Locations from './components/locations'
import Login from './components/login'

export default (props) =>  {
        return (
            <div>
                <Nav />
                <div className="content">
                    <Route exact path="/" component={MapView} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/artwork" component={Artwork} />
                    <Route path="/artwork/:id" component={NewPiece} />
                    <Route exact path="/artists" component={Artists} />
                    <Route path="/artists/:id" component={NewArtist} />
                    <Route exact path="/locations" component={Locations} />
                    <Route path="/locations/:id" component={NewLocation} />
                </div>
                <Footer />
            </div>
        )
}
