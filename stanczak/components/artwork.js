import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseArtwork, deletePiece} from '../store/thunks'
import {clearSelection} from '../store/actions'
import { Piece, NewPiece, ArtworkTmpl } from './'

class Artwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newView: false,
        }
    }

    componentDidMount() {
        this.props.browseInitialArtwork()
        this.props.clearSelection()
    }

    toggleView = () => {
        console.log("here", this)
        this.setState({
            newView: !this.state.newView
        })
    }

    render() {
        return (
            <ArtworkTmpl artwork={this.props.artwork} deletePiece={this.props.deletePiece} newView={this.state.newView} toggleView={this.toggleView} />
        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseInitialArtwork: () => dispatch(browseArtwork()),
        deletePiece: (id) => dispatch(deletePiece(id)),
        clearSelection: () => dispatch(clearSelection())

    }
}

const mapProps = state => {
    return {
        artwork: state.artwork
    }
}

export default connect(mapProps, mapDispatch)(Artwork)
