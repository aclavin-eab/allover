import {createStore, applyMiddleware} from "redux"
import thunker from 'redux-thunk'
import logger from 'redux-logger'
import ACTIONS from './actionConstants'
import * as actions from './actions'

const initialState = {
    artists: [],
    artwork: [],
    selectedPiece: {},
    selectedArtist: {}
}

//helper
const getIndexOfPiece = (id, arr) => {
    return arr.findIndex(art => {
        console.log(art.id, id)
        return art.id === +id
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.BROWSE_ARTWORK: {
            return {
                ...state,
                artwork: action.artwork
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
        case ACTIONS.ADD_LOCATION: {
            return {
                ... state,
                locations: state.locations.concat([action.location])
            }
        }
        default: {
            return state
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunker, logger))

export default store
