import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addArtist, readArtist, editArtist } from '../store'

class newArtist extends Component {
    constructor() {
        super()
        this.state = {
            editMode: false,
            selectedArtist: {
                name: ''
            }
        }
    }

    componentDidMount = () => {
        this.props.match && this.props.match.params.id && this.props.readArtist(this.props.match.params.id)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selectedArtist: nextProps.selectedArtist
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        let objy = {name: ev.target.name.value, origin: ev.target.origin.value, imageUrl: ev.target.imageUrl.value, bio: ev.target.bio.value}

        if(this.state.selectedArtist.id){
            objy = this.state.selectedArtist
        }
        this.props.addArtist(objy).then(_ => {
            if(this.props.match && this.props.match.params.id){
                this.props.readArtist(this.props.match.params.id)
            }
            this.setState({editMode: false})
        }, function(err){
            console.log(err)
        })
    }
    toggleEdit = () => {
        this.setState({editMode: true})
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
                <form onSubmit={this.handleSubmit}>
                <input name="name" type="text" value={this.state.selectedArtist && this.state.selectedArtist.name} onChange={this.updateField}/>
                <input name="origin" type="text" value={this.state.selectedArtist && this.state.selectedArtist.origin} onChange={this.updateField}/>
                <input name="imageUrl" type="text" value={this.state.selectedArtist && this.state.selectedArtist.imageUrl} onChange={this.updateField}/>
                <textarea name="bio" type="text" value={this.state.selectedArtist && this.state.selectedArtist.bio} onChange={this.updateField}></textarea>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <div>Name: {this.state.selectedArtist && this.state.selectedArtist.name}</div>
                    <div>Origin: {this.state.selectedArtist && this.state.selectedArtist.origin}</div>
                    <div>Image: {this.state.selectedArtist && this.state.selectedArtist.imageUrl}</div>
                    <div>Bio: {this.state.selectedArtist && this.state.selectedArtist.bio}</div>
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
        readArtist: (id) => dispatch(readArtist(id))
    }
}
const mapProps = state => {
    return {
        artists: state.artists,
        selectedArtist: state.selectedArtist
    }
}

export default connect(mapProps, mapDispatch)(newArtist)
