import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { readPiece } from '../store'

class PieceView extends Component {
    componentDidMount() {
        this.props.readPiece(this.props.match.params.id)
    }

    render() {
        const piece = this.props.selectedPiece
        return (
            <div> YO WE ON HERE{piece.title}</div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        readPiece: (id) => dispatch(readPiece(id))
    }
}

const mapProps = state => {
    return {
        artists: state.artists,
        artwork: state.artwork,
        selectedPiece: state.selectedPiece
    }
}

export default withRouter(connect(mapProps, mapDispatch)(PieceView));
