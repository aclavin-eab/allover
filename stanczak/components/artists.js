import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseArtists, deleteArtist, clearSelection} from '../store'
import Artist from './artist'
import NewArtist from './newArtist'

class Artists extends Component {
    componentDidMount() {
        this.props.browseInitialArtists()
        this.props.clearSelection()
    }

    render() {
        const artists = this.props.artists
        return (
            <div>
            <div className="itemWrapper">
                {artists && artists.map(ar => (
                    <div className="item" key={ar.id}>
                        <Link to={`/artists/${ar.id}`}>
                            <Artist artist={ar} />
                        </Link>
                        <button onClick={_ => this.props.deleteArtist(ar.id)}>X</button>
                    </div>
                ))}
                </div>
                <NewArtist />
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseInitialArtists: () => dispatch(browseArtists()),
        deleteArtist: (id) => dispatch(deleteArtist(id)),
        clearSelection: () => dispatch(clearSelection())
    }
}
const mapProps = state => {
    return {
        artists: state.artists
    }
}

export default connect(mapProps, mapDispatch)(Artists)
