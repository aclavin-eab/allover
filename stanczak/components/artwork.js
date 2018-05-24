import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseArtwork, deletePiece, clearSelection} from '../store'
import Piece from './piece'
import NewPiece from './newPiece'

class Artwork extends Component {
    componentDidMount() {
        this.props.browseInitialArtwork()
        this.props.clearSelection()
    }

    render() {
        const artwork = this.props.artwork
        const deletePiece = this.props.deletePiece
        return (
            <div>
                {artwork && artwork.map(piece => (
                    <div key={piece.id}>
                        <Link to={`/artwork/${piece.id}`}>
                            <Piece piece={piece} />
                        </Link>
                        <div onClick={_ => {deletePiece(piece.id)}}>X</div>
                    </div>
                ))}
                <NewPiece />
            </div>
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
