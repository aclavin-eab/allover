import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { addArtist, readArtist, editArtist, browseArtwork, editPiece } from '../store'
import Piece from './piece'

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
        console.log(ev.target.imageUrl.value, !!ev.target.imageUrl.value)
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
    render() {
        const artists = this.props.artists
        return (
            <div>
            {!this.state.selectedArtist || !this.state.selectedArtist.id || this.state.editMode ? (
                <div>
                <form onSubmit={this.handleSubmit}>
                <label>Name
                <input name="name" type="text" value={this.state.selectedArtist && this.state.selectedArtist.name} onChange={this.updateField}/>
                </label>
                <label>Origin
                <input name="origin" type="text" value={this.state.selectedArtist && this.state.selectedArtist.origin} onChange={this.updateField}/>
                </label>
                <label>ImageUrl
                <input name="imageUrl" type="text" value={this.state.selectedArtist && this.state.selectedArtist.imageUrl} onChange={this.updateField}/>
                </label>
                <label> Bio
                <textarea name="bio" type="text" value={this.state.selectedArtist && this.state.selectedArtist.bio} onChange={this.updateField}></textarea>
                </label>
                <button type="submit">Submit</button>
                </form>
                <h3>art</h3>
                <h4>Add art to artist</h4>
                {this.state.selectedArtist && this.state.selectedArtist.id && (
                    <div>
                <form onSubmit={this.handleSecondarySubmit}>
                    <select name="artworkToAdd">
                        {this.props && this.props.artwork.map(art => (
                            <option key={`unowned${art.id}`} value={art.id}>{art.title}</option>
                        )) }
                    </select>
                    <button type="submit">Claim work</button>
                </form>
                <h4>Artists work</h4>
                {this.state.selectedArtist && this.state.selectedArtist.artworks.map(art => (
                    <div key={art.id}><Piece piece={art} /><button onClick={_ => {this.props.editPiece({id: art.id, artistId: null})}}>Remove work</button></div>
                ))}
                <button onClick={this.toggleEdit}>CANCEL</button>
                </div>
                )
                }

                </div>
            ) : (
                <div>
                    <div>Name: {this.state.selectedArtist && this.state.selectedArtist.name}</div>
                    <div>Origin: {this.state.selectedArtist && this.state.selectedArtist.origin}</div>
                    <div>Image: {this.state.selectedArtist && this.state.selectedArtist.imageUrl}</div>
                    <div>Bio: {this.state.selectedArtist && this.state.selectedArtist.bio}</div>
                    <h2>ART SHIT</h2>
                    {this.state.selectedArtist && this.state.selectedArtist.artworks.map(art => {
                        return <Piece key={art.id} piece={art} />
                    })}
                    <button onClick={this.toggleEdit}>EDIT</button>
                </div>
            )
            }
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addArtist: (obj) => dispatch(obj.id? editArtist(obj) : addArtist(obj)),
        readArtist: (id) => dispatch(readArtist(id)),
        browseArtwork: () => dispatch(browseArtwork()),
        editPiece: (obj) => dispatch(editPiece(obj)),
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
