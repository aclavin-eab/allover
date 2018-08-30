import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import { addArtist, readArtist, editArtist, browseArtwork, editPiece, deleteArtist } from '../store/thunks'
import { NewArtistTmpl } from './'

class newArtist extends Component {
    constructor() {
        super()
        this.state = {
            editMode: false,
            artworks: [],
            selectedArtist: {
                name: '',
                artworks: []
            }
        }
    }

    componentDidMount = () => {
        this.props.match && this.props.match.params.id && this.props.readArtist(this.props.match.params.id)
        this.props.browseArtwork()
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selectedArtist: nextProps.selectedArtist
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        let objy = {name: ev.target.name.value, origin: ev.target.origin.value, bio: ev.target.bio.value}
        !!ev.target.imageUrl.value && (objy.imageUrl = ev.target.imageUrl.value)
        if(this.state.selectedArtist.id){
            objy = this.state.selectedArtist
        }
        this.props.addArtist(objy).then(artist => {
            if(this.props.match && this.props.match.params.id){
                this.props.readArtist(this.props.match.params.id)
            }
            !objy.id && this.props.history.push(`/artists/${artist.id}`)
            this.setState({editMode: false})
        }, function(err){
            console.log(err)
        })
    }
    handleSecondarySubmit = (ev) => {
        ev.preventDefault(); this.props.editPiece({id: ev.target.artworkToAdd.value, artistId: this.props.match.params.id})
    }
    toggleEdit = () => {
        this.setState({editMode: !this.state.editMode})
    }
    updateField = (ev) => {
        this.setState({selectedArtist : {
            ...this.state.selectedArtist,
            [ev.target.name]: ev.target.value
        }})
    }
    delete = () => {
        this.props.deleteArtist(this.props.match.params.id).then(_ => {
            this.props.history.push(`/artists/`)
        })
    }
    render() {
        const artists = this.props.artists
        return (
            <NewArtistTmpl artists={this.props.artists} selectedArtist={this.state.selectedArtist} editMode={this.state.editMode} handleSubmit={this.handleSubmit}
            handleSecondarySubmit={this.handleSecondarySubmit} updateField={this.updateField} editPiece={this.props.editPiece} artwork={this.props.artwork}
            toggleEdit={this.toggleEdit} deleter={this.delete} cancel={this.props.cancel} />
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addArtist: (obj) => dispatch(obj.id? editArtist(obj) : addArtist(obj)),
        readArtist: (id) => dispatch(readArtist(id)),
        browseArtwork: () => dispatch(browseArtwork()),
        editPiece: (obj) => dispatch(editPiece(obj)),
        deleteArtist: (id) => dispatch(deleteArtist(id)),
    }
}
const mapProps = state => {
    return {
        artists: state.artists,
        selectedArtist: state.selectedArtist,
        artwork: state.artwork
    }
}

export default withRouter(connect(mapProps, mapDispatch)(newArtist))
