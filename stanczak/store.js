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
    BROWSE_ARTISTS: 'BROWSE_ARTISTS'
}

export const stockArtwork = (artwork) => {
    return {type: ACTIONS.BROWSE_ARTWORK, artwork}
}

export const stockArtists = (artists) => {
    return {type: ACTIONS.BROWSE_ARTISTS, artists}
}

//THUNKS
export function browseArtwork() {
    return async dispatch => {
        const response = await axios.get('/api/artwork')
        const art = response.data
        dispatch(stockArtwork(art))
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
        default: {
            return state
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunker, logger))

export default store
