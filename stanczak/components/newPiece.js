import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import { addPiece, browseArtists, readPiece, editPiece, deletePiece } from '../store'

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
        this.props.match && this.props.match.params.id && this.props.readPiece(this.props.match.params.id)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selectedPiece: nextProps.selectedPiece
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        let objy = {
            title: ev.target.title.value,
            artistId: +ev.target.artistId.value,
            medium: ev.target.medium.value,
            contact: ev.target.contact.value,
            rating: +ev.target.rating.value,
        }
        !!ev.target.imageUrl.value && (objy.imageUrl = ev.target.imageUrl.value)
        if(this.state.selectedPiece.id){
            objy = this.state.selectedPiece
            if(objy.artistId === "null"){
                objy.artistId = null
            }
        }
        this.props.addPiece(objy).then(art => {
            if(this.props.match && this.props.match.params.id){
                this.props.readPiece(this.props.match.params.id)
            }
            !objy.id && this.props.history.push(`/artwork/${art.id}`)
            this.setState({editMode: false})
        }, function(){})
    }

    toggleEdit = () => {
        this.setState({editMode: true})
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

    render() {
        const artists = this.props.artists
        return (
            <div className="itemView">
            <div className="didact">
            {!this.state.selectedPiece || !this.state.selectedPiece.id || this.state.editMode ? (
            <form onSubmit={this.handleSubmit}>
                <h2>Add New Artwork</h2>
                <label>Title
                <input name="title" type="text" required value={this.state.selectedPiece && this.state.selectedPiece.title} onChange={this.updateField}/>
                </label>
                <label>Medium
                <input name="medium" type="text" value={this.state.selectedPiece && this.state.selectedPiece.medium} onChange={this.updateField}/>
                </label>
                <label>Contact
                <input name="contact" type="email" required value={this.state.selectedPiece && this.state.selectedPiece.contact} onChange={this.updateField}/>
                </label>
                <label> ImageUrl
                <input name="imageUrl" type="text" value={this.state.selectedPiece && this.state.selectedPiece.imageUrl} onChange={this.updateField}/>
                </label>
                <label>Rating
                <input name="rating" type="text" value={this.state.selectedPiece && this.state.selectedPiece.rating} onChange={this.updateField}/>
                </label>
                <select name="artistId" value={this.state.selectedPiece && this.state.selectedPiece.artistId} onChange={this.updateField}>
                        <option value={'null'} >Select An Artist</option>
                    {artists && artists.map(artist => (
                        <option key={artist.id} className="option" value={artist.id}>{artist.name}</option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
            ) : (
                <div>
                    <div><h1>{this.state.selectedPiece && this.state.selectedPiece.title}</h1></div>
                    <div>Medium: {this.state.selectedPiece && this.state.selectedPiece.medium}</div>
                    <div>Contact: {this.state.selectedPiece && this.state.selectedPiece.contact}</div>
                    <div>Rating: {this.state.selectedPiece && this.state.selectedPiece.rating}</div>
                    <div>By: {this.state.selectedPiece && this.state.selectedPiece.artist && (
                        <Link to={`/artists/${this.state.selectedPiece.artist.id}`}>{this.state.selectedPiece.artist.name}</Link>
                    ) || 'artist unknown'}</div>
                    <button onClick={this.toggleEdit}>EDIT</button>
                    <button onClick={this.delete}>DELETE</button>
                </div>
            )
            }
            </div>
            <div><img src={this.state.selectedPiece && this.state.selectedPiece.imageUrl}/></div>
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addPiece: (obj) => dispatch(obj.id ? editPiece(obj) : addPiece(obj)),
        browseInitialArtists: () => dispatch(browseArtists()),
        readPiece: (id) => dispatch(readPiece(id)),
        deletePiece: (id) => dispatch(deletePiece(id)),
    }
}

const mapProps = state => {
    return {
        artists: state.artists,
        selectedPiece: state.selectedPiece
    }
}

export default withRouter(connect(mapProps, mapDispatch)(newPiece))
