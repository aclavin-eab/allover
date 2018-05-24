import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseArtwork, readArtwork} from '../store'
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
                    <Link key={piece.id} to={`/artwork/${piece.id}`}>
                        <Piece onClick={_ => {console.log('clicked it' + piece.id)}} piece={piece} />
                    </Link>
                ))}
                <NewPiece />
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseInitialArtwork: () => dispatch(browseArtwork()),

    }
}
const mapProps = state => {
    return {
        artwork: state.artwork
    }
}

export default connect(mapProps, mapDispatch)(Artwork)
