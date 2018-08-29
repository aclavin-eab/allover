import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browseArtists, deleteArtist} from '../store/thunks'
import {clearSelection} from '../store/actions'
import ArtistsTmpl from './artists.tmpl'

class Artists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newView: false,
        }
    }

    componentDidMount() {
        this.props.browseInitialArtists()
        this.props.clearSelection()
    }

    toggleView = () => {
        this.setState({
            newView: !this.state.newView
        })
    }

    render() {
        const artists = this.props.artists
        return (
            <ArtistsTmpl artists={this.props.artists} toggleView={this.toggleView} newView={this.state.newView} />
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
