import axios from 'axios'
import * as actions from './actions'

//THUNKS
export function readUser(userObj) {
    return async dispatch => {
        console.log("about to send", userObj)
        const response = await axios.post('/api/users/login', userObj)
        const user = response.data
        dispatch(actions.login(user))
    }
}

export function addUser(userObj) {
    return async dispatch => {
        console.log("about to send", userObj)
        const response = await axios.post('/api/users/signup', userObj)
        const user = response.data
        dispatch(actions.signup(user))
    }
}

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
        dispatch(actions.changePiece(obj))
        return piece
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

export function browseLocations() {
    return async dispatch => {
        const response = await axios.get('/api/locations')
        const locations = response.data
        dispatch(actions.stockLocations(locations))
    }
}

export function readLocation(id) {
    return async dispatch => {
        const response = await axios.get(`/api/locations/${id}`)
        const location = response.data
        dispatch(actions.featureLocation(location))
        return location
    }
}

export function editLocation(obj) {
    return async dispatch => {
        const response = await axios.put(`/api/locations/${obj.id}`, obj)
        const locations = response.data
        dispatch(actions.changeLocation(location))
    }
}

export function deleteLocation(id) {
    return async dispatch => {
        const response = await axios.delete(`/api/locations/${id}`)
        const location = response.data
        dispatch(actions.sellArtist(location))
    }
}
