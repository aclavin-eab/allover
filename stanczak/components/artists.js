import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseArtists, deleteArtist} from '../store/thunks'
import {clearSelection} from '../store/actions'
import Artist from './artist'
import NewArtist from './newArtist'

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
        console.log("here", this)
        this.setState({
            newView: !this.state.newView
        })
    }

    render() {
        const artists = this.props.artists
        return (
            <div className="artistsWrapper">
                <div className="itemWrapper">
                    {artists && artists.map(ar => (
                        <div className="item" key={ar.id}>
                            <Link style={{backgroundImage: `url(${ar.imageUrl})`}} to={`/artists/${ar.id}`}>
                                <Artist artist={ar} />
                            </Link>
                        </div>
                    ))}
                    {(artists.length < 1) && (<div>NO ARTISTS FOUND</div>)}
                </div>
                {this.state.newView && (
                    <NewArtist cancel={this.toggleView}/>
                )}
                <button className="headerButton" onClick={this.toggleView}>Add New Artist</button>
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
