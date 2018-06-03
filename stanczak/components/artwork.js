import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseArtwork, deletePiece} from '../store/thunks'
import {clearSelection} from '../store/actions'
import Piece from './piece'
import NewPiece from './newPiece'

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
        const artwork = this.props.artwork
        const deletePiece = this.props.deletePiece
        return (
            <div className="artworkWrapper">
            <div className="itemWrapper">
                {artwork && artwork.map(piece => (
                    <div className="item" key={piece.id}>
                        <Link to={`/artwork/${piece.id}`}>
                            <Piece piece={piece} />
                        </Link>
                    </div>
                ))}

            </div>
            {this.state.newView && (
            <NewPiece cancel={this.toggleView}/>
            )}
            <button className="headerButton" onClick={this.toggleView}>Add New Piece</button>
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
