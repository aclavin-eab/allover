import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addPiece, browseArtists, readPiece } from '../store'

class newPiece extends Component {
    constructor() {
        super()
        this.state = {
            editMode: false,
            selectedPiece: this.props ? this.props.selectedPiece : {}
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
        this.props.addPiece({title: ev.target.title.value, artistId: +ev.target.artistId.value})
    }

    toggleEdit = () => {
        this.setState({editMode: true})
    }

    updateField = (ev) => {
        this.setState({selectedPiece : {
            [ev.target.name]: ev.target.value
        }})
    }

    render() {
        const artists = this.props.artists
        return (
            <div>
            { !this.state.selectedPiece.id || this.state.editMode ? (
            <form onSubmit={this.handleSubmit}>
                <input name="title" type="text" value={this.state.selectedPiece.title} onChange={this.updateField}/>
                <select name="artistId" value={this.state.selectedPiece.artistId} onChange={this.updateField}>
                    {artists && artists.map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        ) : (
                <div>
                    <div> YO WE ON HERE{this.state.selectedPiece.title}</div>
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
        addPiece: (obj) => dispatch(obj.id ? editPiece(obj) : addPiece(obj)),
        browseInitialArtists: () => dispatch(browseArtists()),
        readPiece: (id) => dispatch(readPiece(id))
    }
}
const mapProps = state => {
    return {
        artists: state.artists,
        selectedPiece: state.selectedPiece
    }
}

export default connect(mapProps, mapDispatch)(newPiece)
