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
        let objy = {name: ev.target.name.value}

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
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <div>{this.state.selectedArtist && this.state.selectedArtist.name}</div>
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
