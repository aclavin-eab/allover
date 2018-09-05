import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import { addPiece, browseArtists, readPiece, editPiece, deletePiece, addLocation, browseLocations } from '../store/thunks'
import { featurePiece } from '../store/actions'
import EncodeFile from '../utilities/encodeFile'
import Geolocate from '../utilities/geolocate'
import { NewPieceTmpl } from './'

class newPiece extends Component {
    constructor() {
        super()
        this.state = {
            editMode: false,
            selectedPiece: {
                title: ''
            }
        }
    }

    componentDidMount = () => {
        this.props.browseInitialArtists()
        this.props.browseLocations()
        this.props.match && this.props.match.params.id && this.props.readPiece(this.props.match.params.id)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selectedPiece: nextProps.selectedPiece
        })
    }

    addPieceCallback = (data) =>{
        this.setState({editMode: false})
        data.id && this.props.history.push(`/artwork/${data.id}`)
    }

    checkForLocationToAdd = async (piece) => {
        let locationObj
        if(piece.latitude && piece.longitude ){
            locationObj = await this.props.addLocation({
                latitude: +piece.latitude,
                longitude: +piece.longitude,
                title: piece.loctitle,
                description: piece.locdescription
            })
            return locationObj.id
        }
        return null
    }

    handleSubmit = async (ev) => {
        ev.preventDefault()
        let piece = this.state.selectedPiece;
        if(!!piece.imageFile){
            piece.imageFile = await EncodeFile(ev.target.imageFile.files[0])
        }
        if(!piece.locationId){
            piece.locationId = await this.checkForLocationToAdd(piece)
        }
        if(piece.artistId === "null"){
            piece.artistId = null
        }
        piece.userId = this.props.userId
        this.props.addPiece(piece).then(this.addPieceCallback, err => console.log(err))
    }

    toggleEdit = () => {
        this.setState({editMode: !this.state.editMode})
    }

    updateField = (ev) => {
        this.setState({selectedPiece : {
            ...this.state.selectedPiece,
            [ev.target.name]: ev.target.value
        }})
    }

    delete = () => {
        this.props.deletePiece(this.props.match.params.id).then(_ => {
            this.props.history.push(`/artwork/`)
        })
    }

    geolocate = async () => {
        const position = await Geolocate();
        this.setState({selectedPiece: {
            ...this.state.selectedPiece,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }});
    }

    render() {
        const artists = this.props.artists
        const locations = this.props.locations
        return (
            <NewPieceTmpl artists={this.props.artists} locations={this.props.locations} selectedPiece={this.state.selectedPiece} editMode={this.state.editMode} handleSubmit={this.handleSubmit}
            handleSecondarySubmit={this.handleSecondarySubmit} updateField={this.updateField} editPiece={this.props.editPiece} artwork={this.props.artwork}
            toggleEdit={this.toggleEdit} deleter={this.delete} cancel={this.props.cancel} geolocate={this.geolocate} />
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addPiece: (obj) => dispatch(obj.id ? editPiece(obj) : addPiece(obj)),
        browseInitialArtists: () => dispatch(browseArtists()),
        browseLocations: () => dispatch(browseLocations()),
        readPiece: (id) => dispatch(readPiece(id)),
        deletePiece: (id) => dispatch(deletePiece(id)),
        addLocation: (obj) => dispatch(addLocation(obj))
    }
}

const mapProps = state => {
    return {
        artists: state.artists,
        locations: state.locations,
        selectedPiece: state.selectedPiece,
        userId: state.user.id
    }
}

export default withRouter(connect(mapProps, mapDispatch)(newPiece))
