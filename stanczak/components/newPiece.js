import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import { addPiece, browseArtists, readPiece, editPiece, deletePiece } from '../store/thunks'
import PieceDisplay from './PieceDisplay'
import PieceForm from './PieceForm'

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

    encodeUrl = () => {

    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        //const submitEv = ev
        let objy = {
            title: ev.target.title.value,
            artistId: +ev.target.artistId.value,
            medium: ev.target.medium.value,
            contact: ev.target.contact.value,
            imageName: ev.target.imageName.value,
            rating: +ev.target.rating.value,
        }
        !!ev.target.imageUrl.value && (objy.imageUrl = ev.target.imageUrl.value)
        if(!!ev.target.imageFile.value){
            const r = new FileReader()
            const f = ev.target.imageFile.files[0]
            r.readAsDataURL(f)
            r.onloadend = (ev) => {
                if(this.state.selectedPiece.id){
                    objy = this.state.selectedPiece
                    if(objy.artistId === "null"){
                        objy.artistId = null
                    }
                }
                objy.imageFile = r.result
                // objy.imageName = submitEv.target.imageName.value
                this.props.addPiece(objy).then(art => {
                    if(this.props.match && this.props.match.params.id){
                        this.props.readPiece(this.props.match.params.id)
                    }
                    !objy.id && this.props.history.push(`/artwork/${art.id}`)
                    this.setState({editMode: false})
                }, function(){})
            }
        } else {
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
                            <PieceForm selectedPiece={this.state.selectedPiece} updateField={this.updateField} handleSubmit={this.handleSubmit} artists={artists} />
                        ) : (
                            <PieceDisplay selectedPiece={this.state.selectedPiece} />
                        )
                    }
                    <button onClick={this.toggleEdit}>EDIT</button>
                    <button onClick={this.delete}>DELETE</button>
                </div>
                <img src={this.state.selectedPiece && this.state.selectedPiece.imageUrl}/>
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
