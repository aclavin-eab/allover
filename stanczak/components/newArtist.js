import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addArtist } from '../store'

class newArtist extends Component {
    
    handleSubmit = (ev) => {
        ev.preventDefault()
        console.log(ev.target.name.value)
        this.props.addArtist({name: ev.target.name.value})
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
        addArtist: (obj) => dispatch(addArtist(obj))
    }
}
const mapProps = state => {
    return {
        artists: state.artists
    }
}

export default connect(mapProps, mapDispatch)(newArtist)
