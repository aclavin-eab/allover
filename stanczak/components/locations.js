import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseLocations, deleteArtist} from '../store/thunks'
import {clearSelection} from '../store/actions'
import { LocationsTmpl } from './'

class Locations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newView: false,
        }
    }

    componentDidMount() {
        this.props.browseLocations()
        this.props.clearSelection()
    }

    toggleView = () => {
        console.log("here", this)
        this.setState({
            newView: !this.state.newView
        })
    }

    render() {
        return (
            <LocationsTmpl locations={this.props.locations} deletePiece={this.props.deletePiece} newView={this.state.newView} toggleView={this.toggleView} />
        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseLocations: () => dispatch(browseLocations()),
        deleteArtist: (id) => dispatch(deleteArtist(id)),
        clearSelection: () => dispatch(clearSelection())
    }
}
const mapProps = state => {
    return {
        locations: state.locations
    }
}

export default connect(mapProps, mapDispatch)(Locations)
