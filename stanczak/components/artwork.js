import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browseArtwork} from '../store'
import Piece from './piece'
import NewPiece from './newPiece'

class Artwork extends Component {
    componentDidMount() {
        this.props.browseInitialArtwork()
    }

    render() {
        const artwork = this.props.artwork
        return (
            <div>
                {artwork && artwork.map(piece => (
                    <Piece key={piece.id} piece={piece} />
                ))}
                <NewPiece />
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
        artwork: state.artwork
    }
}

export default connect(mapProps, mapDispatch)(Artwork)
