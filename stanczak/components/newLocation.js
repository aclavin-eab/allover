import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import { addLocation, readLocation, editLocation, browseArtwork, editPiece, deleteLocation } from '../store/thunks'
import { NewLocationTmpl } from './'

class newLocation extends Component {
    constructor() {
        super()
        this.state = {
            editMode: false,
            artworks: [],
            selectedLocation: {
                title: '',
                artwork: []
            }
        }
    }

    componentDidMount = () => {
        console.log('component mounted')
        this.props.match && this.props.match.params.id && this.props.readLocation(this.props.match.params.id)
        this.props.browseArtwork()
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selectedLocation: nextProps.selectedLocation
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.addLocation(this.state.selectedLocation).then(location => {
            if(this.props.match && this.props.match.params.id){
                this.props.readLocation(this.props.match.params.id)
            }
            !this.state.selectedLocation && this.props.history.push(`/locations/${location.id}`)
            this.setState({editMode: false})
        }, function(err){
            console.log(err)
        })
    }
    handleSecondarySubmit = (ev) => {
        ev.preventDefault();
        this.props.editPiece({
            id: ev.target.artworkToAdd.value,
            locationId: this.props.match.params.id
        })
    }
    toggleEdit = () => {
        this.setState({editMode: !this.state.editMode})
    }
    updateField = (ev) => {
        this.setState({selectedLocation : {
            ...this.state.selectedLocation,
            [ev.target.name]: ev.target.value
        }})
    }
    delete = () => {
        this.props.deleteLocation(this.props.match.params.id).then(_ => {
            this.props.history.push(`/locations/`)
        })
    }
    render() {
        const locations = this.props.locations
        return (
            <NewLocationTmpl locations={this.props.locations} selectedLocation={this.state.selectedLocation} editMode={this.state.editMode} handleSubmit={this.handleSubmit}
            handleSecondarySubmit={this.handleSecondarySubmit} updateField={this.updateField} editPiece={this.props.editPiece} artwork={this.props.artwork}
            toggleEdit={this.toggleEdit} deleter={this.delete} cancel={this.props.cancel} />
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addLocation: (obj) => dispatch(obj.id? editLocation(obj) : addLocation(obj)),
        readLocation: (id) => dispatch(readLocation(id)),
        browseArtwork: () => dispatch(browseArtwork()),
        editPiece: (obj) => dispatch(editPiece(obj)),
        deleteLocation: (id) => dispatch(deleteLocation(id)),
    }
}
const mapProps = state => {
    return {
        locations: state.locations,
        selectedLocation: state.selectedLocation,
        artwork: state.artwork
    }
}

export default withRouter(connect(mapProps, mapDispatch)(newLocation))
