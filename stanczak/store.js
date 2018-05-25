import {createStore, applyMiddleware} from "redux"
import thunker from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

const initialState = {
    artists: [],
    artwork: [],
    selectedPiece: {},
    selectedArtist: {}
}

const ACTIONS = {
    BROWSE_ARTWORK: 'BROWSE_ARTWORK',
    BROWSE_ARTISTS: 'BROWSE_ARTISTS',
    ADD_ARTIST: 'ADD_ARTIST',
    ADD_PIECE: 'ADD_PIECE',
    READ_PIECE: 'READ_PIECE',
    EDIT_PIECE: 'EDIT_PIECE',
    DELETE_PIECE: 'DELETE_PIECE',
    READ_ARTIST: 'READ_ARTIST',
    EDIT_ARTIST: 'EDIT_ARTIST',
    DELETE_ARTIST: 'DELETE_ARTIST',
    CLEAR_SELECTION: 'CLEAR_SELECTION',
}

//helper
const getIndexOfPiece = (id, arr) => {
    return arr.findIndex(art => {
        console.log(art.id, id)
        return art.id === +id
    })
}

export const stockArtwork = (artwork) => {
    return {type: ACTIONS.BROWSE_ARTWORK, artwork}
}

export const stockArtists = (artists) => {
    return {type: ACTIONS.BROWSE_ARTISTS, artists}
}

export const buyArtist = (artist) => {
    return {type: ACTIONS.ADD_ARTIST, artist}
}

export const buyPiece = (piece) => {
    return {type: ACTIONS.ADD_PIECE, piece}
}

export const featurePiece = (piece) => {
    return {type: ACTIONS.READ_PIECE, piece}
}

export const featureArtist = (artist) => {
    return {type: ACTIONS.READ_ARTIST, artist}
}

export const changePiece = (piece => {
    return {type: ACTIONS.EDIT_PIECE, piece}
})

export const changeArtist = (artist => {
    return {type: ACTIONS.EDIT_ARTIST, artist}
})

export const sellPiece = (piece) => {
    return {type: ACTIONS.DELETE_PIECE, piece}
}

export const clearSelection = () => {
    return {type: ACTIONS.CLEAR_SELECTION, piece: {}, artist: {}}
}

export const sellArtist = (artist) => {
    console.log('selling', artist)
    return {type: ACTIONS.DELETE_ARTIST, artist}
}

//THUNKS
export function browseArtwork() {
    return async dispatch => {
        const response = await axios.get('/api/artwork')
        const art = response.data
        dispatch(stockArtwork(art))
    }
}

export function browseArtists() {
    return async dispatch => {
        const response = await axios.get('/api/artists')
        const artists = response.data
        dispatch(stockArtists(artists))
    }
}

export function addArtist(artistObj) {
    return async dispatch => {
        const response = await axios.post('/api/artists', artistObj)
        const artist = response.data
        dispatch(buyArtist(artist))
        return artist
    }
}

export function addPiece(artObj) {
    return async dispatch => {
        const response = await axios.post('/api/artwork', artObj)
        const piece = response.data
        dispatch(buyPiece(piece))
        return piece
    }
}

export function readPiece(id) {
    return async dispatch => {
        const response = await axios.get(`/api/artwork/${id}`)
        const piece = response.data
        dispatch(featurePiece(piece))
    }
}

export function editPiece(obj) {
    return async dispatch => {
        const response = await axios.put(`/api/artwork/${obj.id}`, obj)
        const piece = response.data
        dispatch(changePiece(piece))
    }
}

export function deletePiece(id) {
    return async dispatch => {
        const response = await axios.delete(`/api/artwork/${id}`)
        const piece = response.data
        dispatch(sellPiece(piece))
    }
}

export function readArtist(id) {
    return async dispatch => {
        const response = await axios.get(`/api/artists/${id}`)
        const artist = response.data
        dispatch(featureArtist(artist))
    }
}

export function editArtist(obj) {
    return async dispatch => {
        const response = await axios.put(`/api/artists/${obj.id}`, obj)
        const artist = response.data
        dispatch(changeArtist(artist))
    }
}

export function deleteArtist(id) {
    return async dispatch => {
        const response = await axios.delete(`/api/artists/${id}`)
        const artist = response.data
        dispatch(sellArtist(artist))
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.BROWSE_ARTWORK: {
            return {
                ...state,
                artwork: action.artwork
            }
        }
        case ACTIONS.BROWSE_ARTISTS: {
            return {
                ...state,
                artists: action.artists
            }
        }
        case ACTIONS.ADD_ARTIST: {
            return {
                ...state,
                artists: state.artists.concat([action.artist])
            }
        }
        case ACTIONS.ADD_PIECE: {
            return {
                ...state,
                artwork: state.artwork.concat([action.piece])
            }
        }
        case ACTIONS.READ_PIECE: {
            return {
                ...state,
                selectedPiece: action.piece
            }
        }
        case ACTIONS.EDIT_PIECE: {
            return {
                ...state,
                artwork: [...state.artwork.slice(0, getIndexOfPiece(action.piece.id, state.artwork)),
                            action.piece,
                          ...state.artwork.slice(getIndexOfPiece(action.piece.id, state.artwork) + 1)],
                selectedPiece: action.piece,
            }
        }
        case ACTIONS.DELETE_PIECE: {
            return {
                ...state,
                artwork: [...state.artwork.slice(0, getIndexOfPiece(action.piece, state.artwork)),
                          ...state.artwork.slice(getIndexOfPiece(action.piece, state.artwork) + 1)]
            }
        }
        case ACTIONS.READ_ARTIST: {
            return {
                ...state,
                selectedArtist: action.artist
            }
        }
        case ACTIONS.EDIT_ARTIST: {
            return {
                ...state,
                artists: [...state.artists.slice(0, getIndexOfPiece(action.artist.id, state.artists)),
                            action.artist,
                          ...state.artist.slice(getIndexOfPiece(action.artist.id, state.artists) + 1)],
                selectedArtist: action.artist,
            }
        }
        case ACTIONS.DELETE_ARTIST: {
            return {
                ...state,
                artists: [...state.artists.slice(0, getIndexOfPiece(action.artist, state.artists)),
                          ...state.artists.slice(getIndexOfPiece(action.artist, state.artists) + 1)]
            }
        }
        case ACTIONS.CLEAR_SELECTION: {
            return {
                ...state,
                selectedPiece: action.selectedPiece,
                selectedArtist: action.selectedArtist
            }
        }
        default: {
            return state
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunker, logger))

export default store
