import axios from 'axios'
import * as actions from './actions'

//THUNKS
export function browseArtwork() {
    return async dispatch => {
        const response = await axios.get('/api/artwork')
        const art = response.data
        dispatch(actions.stockArtwork(art))
    }
}

export function browseArtists() {
    return async dispatch => {
        const response = await axios.get('/api/artists')
        const artists = response.data
        dispatch(actions.stockArtists(artists))
    }
}

export function addArtist(artistObj) {
    return async dispatch => {
        const response = await axios.post('/api/artists', artistObj)
        const artist = response.data
        dispatch(actions.buyArtist(artist))
        return artist
    }
}

export function addPiece(artObj) {
    return async dispatch => {
        const response = await axios.post('/api/artwork', artObj)
        const piece = response.data
        dispatch(actions.buyPiece(piece))
        return piece
    }
}

export function readPiece(id) {
    return async dispatch => {
        const response = await axios.get(`/api/artwork/${id}`)
        const piece = response.data
        dispatch(actions.featurePiece(piece))
    }
}

export function editPiece(obj) {
    return async dispatch => {
        const response = await axios.put(`/api/artwork/${obj.id}`, obj)
        const piece = response.data
        dispatch(actions.changePiece(piece))
    }
}

export function deletePiece(id) {
    return async dispatch => {
        const response = await axios.delete(`/api/artwork/${id}`)
        const piece = response.data
        dispatch(actions.sellPiece(piece))
    }
}

export function readArtist(id) {
    return async dispatch => {
        const response = await axios.get(`/api/artists/${id}`)
        const artist = response.data
        dispatch(actions.featureArtist(artist))
    }
}

export function editArtist(obj) {
    return async dispatch => {
        const response = await axios.put(`/api/artists/${obj.id}`, obj)
        const artist = response.data
        dispatch(actions.changeArtist(artist))
    }
}

export function deleteArtist(id) {
    return async dispatch => {
        const response = await axios.delete(`/api/artists/${id}`)
        const artist = response.data
        dispatch(actions.sellArtist(artist))
    }
}

export function addLocation(obj) {
    return async dispatch => {
        const response = await axios.post('/api/locations', obj)
        const location = response.data
        dispatch(actions.buyPiece(location))
        return location
    }
}
