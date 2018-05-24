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
}

//helper
const getIndexOfPiece = (piece, state) => {
    return state.artwork.findIndex(art => {
        return art.id === +piece
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

export const changePiece = (piece => {
    return {type: ACTIONS.EDIT_PIECE, piece}
})

export const sellPiece = (piece) => {
    return {type: ACTIONS.DELETE_PIECE, piece}
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
    }
}

export function addPiece(artObj) {
    return async dispatch => {
        const response = await axios.post('/api/artwork', artObj)
        const piece = response.data
        dispatch(buyPiece(piece))
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
        const response = await axios.delete(`/api/artwork/${obj.id}`, obj)
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
                artwork: [...state.artwork.slice(0, getIndexOfPiece(action.piece.id, state)),
                            action.piece,
                          ...state.artwork.slice(getIndexOfPiece(action.piece.id, state) + 1)]
            }
        }
        case ACTIONS.DELETE_PIECE: {
            return {
                ...state,
                artwork: [...state.artwork.slice(0, getIndexOfPiece(action.piece, state)),
                          ...state.artwork.slice(getIndexOfPiece(action.piece, state) + 1)]
            }
        }
        default: {
            return state
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunker, logger))

export default store
