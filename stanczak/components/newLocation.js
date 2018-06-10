import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import { addLocation, readLocation, editLocation, browseArtwork, editPiece, deleteLocation } from '../store/thunks'
import Piece from './piece'
import LocationDisplay from './LocationDisplay'
import LocationForm from './locationForm'

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
            <div className="locationView">
                {!this.state.selectedLocation || !this.state.selectedLocation.id || this.state.editMode ? (
                    <LocationForm selectedLocation={this.state.selectedLocation} handleSubmit={this.handleSubmit}
                        handleSecondarySubmit={this.handleSecondarySubmit} updateField={this.updateField}
                        editPiece={this.props.editPiece} artwork={this.props.artwork}/>
                    ) : (
                        <LocationDisplay selectedLocation={this.state.selectedLocation} />
                    )
                }
                {this.state.selectedLocation && this.state.selectedLocation && (
                    <div>
                        <button onClick={this.toggleEdit}>EDIT</button>
                        <button onClick={this.delete}>DELETE</button>
                    </div>
                )}
                {this.props.cancel && (
                    <button className="closer" onClick={this.props.cancel}>Cancel</button>
                )}
            </div>
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
