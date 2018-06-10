import React, {Component} from 'react'
import {Route, Link, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {browseArtwork} from '../store'
import Artwork from './artwork'
import Artists from './artists'
import NewPiece from './newPiece'
import NewArtist from './newArtist'
import NewLocation from './newLocation'
import Nav from './nav'
import Footer from './footer'
import MapView from './mapView'
import Locations from './locations'

class Components extends Component {

    componentDidMount() {
        // this.props.browseInitialArtwork()
    }

    render() {
        const artwork = this.props.artwork
        return (
            <div>
                <Nav />
                <div className="content">
                    <Route exact path="/" component={MapView} />
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
}

const mapDispatch = dispatch => {
    return {
        browseInitialArtwork: () => dispatch(browseArtwork())
    }
}

const mapProps = state => {
    return {
        artists: state.artists,
        artwork: state.artwork
    }
}

export default withRouter(connect(mapProps, mapDispatch)(Components));
