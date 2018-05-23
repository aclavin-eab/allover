import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addPiece, browseArtists } from '../store'

class newPiece extends Component {

    componentDidMount() {
        this.props.browseInitialArtists()
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        console.log(ev.target.name.value)
        this.props.addPiece({title: ev.target.title.value, artistId: +ev.target.artistId.value})
    }

    render() {
        const artists = this.props.artists
        console.log(artists)
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="title" type="text"/>
                <select name="artistId">
                    {artists && artists.map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addPiece: (obj) => dispatch(addPiece(obj)),
        browseInitialArtists: () => dispatch(browseArtists())
    }
}
const mapProps = state => {
    return {
        artists: state.artists
    }
}

export default connect(mapProps, mapDispatch)(newPiece)
