import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browseArtists} from '../store'
import Artist from './artist'

class Artists extends Component {
    componentDidMount() {
        this.props.browseInitialArtists()
    }

    render() {
        const artists = this.props.artists
        console.log(artists)
        return (
            <div>
                {artists && artists.map(ar => (
                    <Artist key={ar.id} artist={ar} />
                ))}
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseInitialArtists: () => dispatch(browseArtists())
    }
}
const mapProps = state => {
    return {
        artists: state.artists
    }
}

export default connect(mapProps, mapDispatch)(Artists)
