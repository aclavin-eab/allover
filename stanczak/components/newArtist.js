import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addArtist, readArtist, editArtist } from '../store'

class newArtist extends Component {
    constructor() {
        super()
        this.state = {
            editMode: false,
            selectedArtist: this.props ? this.props.selectedArtist : {}
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
            this.props.readArtist(this.props.match.params.id)
            this.setState({editMode: false})
        }, function(err){
            console.log(err)
        })
    }
    render() {
        const artists = this.props.artists
        console.log(artists)
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="name" type="text"/>
                <button type="submit">Submit</button>
            </form>
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

// import React, {Component} from 'react'
// import { connect } from 'react-redux'
// import { addPiece, browseArtists, readPiece, editPiece } from '../store'

// class newPiece extends Component {
//     constructor() {
//         super()
//         this.state = {
//             editMode: false,
//             selectedPiece: this.props ? this.props.selectedPiece : {}
//         }
//     }
//
//     componentDidMount = () => {
//         this.props.browseInitialArtists()
//         this.props.match && this.props.match.params.id && this.props.readPiece(this.props.match.params.id)
//     }
//
//     componentWillReceiveProps = (nextProps) => {
//         this.setState({
//             selectedPiece: nextProps.selectedPiece
//         })
//     }
//
//     handleSubmit = (ev) => {
//         ev.preventDefault()
//         let objy = {title: ev.target.title.value, artistId: +ev.target.artistId.value}
//         if(this.state.selectedPiece.id){
//             objy = this.state.selectedPiece
//             if(objy.artistId === "null"){
//                 objy.artistId = null
//             }
//         }
//         this.props.addPiece(objy).then(_ => {
//             this.props.readPiece(this.props.match.params.id)
//             this.setState({editMode: false})
//         }, function(){})
//     }
//
//     toggleEdit = () => {
//         this.setState({editMode: true})
//     }
//
//     updateField = (ev) => {
//         this.setState({selectedPiece : {
//             ...this.state.selectedPiece,
//             [ev.target.name]: ev.target.value
//         }})
//     }
//
//     render() {
//         const artists = this.props.artists
//         return (
//             <div>
//             { !this.state.selectedPiece.id || this.state.editMode ? (
//             <form onSubmit={this.handleSubmit}>
//                 <input name="title" type="text" value={this.state.selectedPiece.title} onChange={this.updateField}/>
//                 <select name="artistId" value={this.state.selectedPiece.artistId} onChange={this.updateField}>
//                         <option value={'null'} >Select An Artist</option>
//                     {artists && artists.map(artist => (
//                         <option key={artist.id} value={artist.id}>{artist.name}</option>
//                     ))}
//                 </select>
//                 <button type="submit">Submit</button>
//             </form>
//             ) : (
//                 <div>
//                     <div>{this.state.selectedPiece.title}</div>
//                     <button onClick={this.toggleEdit}>EDIT</button>
//                 </div>
//             )
//             }
//             </div>
//         )
//     }
// }
//
// const mapDispatch = dispatch => {
//     return {
//         addPiece: (obj) => {console.log('editter', obj); return dispatch(obj.id ? editPiece(obj) : addPiece(obj))},
//         browseInitialArtists: () => dispatch(browseArtists()),
//         readPiece: (id) => dispatch(readPiece(id))
//     }
// }
//
// const mapProps = state => {
//     return {
//         artists: state.artists,
//         selectedPiece: state.selectedPiece
//     }
// }
//
// export default connect(mapProps, mapDispatch)(newPiece)
