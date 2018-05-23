import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browseArtwork} from '../store'

class Artwork extends Component {
    componentDidMount() {
        console.log("DONE MOUNTING")
        this.props.browseInitialArtwork()
    }

    render() {
        console.log(this.props);
        const artwork = this.props.artwork
        return (
            <div>
                {artwork && artwork.map(piece => (
                    <div key={piece.id}>{piece.title}</div>
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
        artwork: state.artwork
    }
}

export default connect(mapProps, mapDispatch)(Artwork)
