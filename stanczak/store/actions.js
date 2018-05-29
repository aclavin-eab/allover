import ACTIONS from './actionConstants'

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
    return {type: ACTIONS.DELETE_ARTIST, artist}
}
