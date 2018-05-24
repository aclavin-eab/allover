import React, {Component} from 'react'
import {Route, Link, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {browseArtwork} from '../store'
import Artwork from './artwork'
import Artists from './artists'
import PieceView from './pieceView'
import NewPiece from './newPiece'
import NewArtist from './newArtist'
import Nav from './nav'

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
                    <Route exact path="/artwork" component={Artwork} />
                    <Route path="/artwork/:id" component={NewPiece} />
                    <Route exact path="/artists" component={Artists} />
                    <Route path="/artists/:id" component={NewArtist} />
                </div>
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
