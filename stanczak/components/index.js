import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {browseArtwork} from '../store'

class Components extends Component {

    componentDidMount() {
        this.props.browseInitialArtwork()
    }
    render() {
        const artwork = this.props.artwork
        return (
            <div>
                {artwork && artwork.map(piece => (
                    <div>{piece.title}</div>
                ))}
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

export default connect(mapProps, mapDispatch)(Components)
