const ADD_SINGLE_SONG = "ADD_SINGLE_SONG";
const ADD_SONGS = "ADD_SONGS";
const UPDATE_SONG = "UPDATE_SONG";
const REMOVE_SONG = "REMOVE_SONG";


const addSongsToState = (songsList) => {
    return {
        type: ADD_SONGS,
        payload: songsList
    }
}

const addSingleSong = (song) => {
    return {
        type: ADD_SINGLE_SONG,
        payload: song
    }
}
const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        payload: song
    }
}

const removeSong = (song) => {
    return {
        type: REMOVE_SONG,
        payload: song
    }
}


export {ADD_SONGS, ADD_SINGLE_SONG, REMOVE_SONG, UPDATE_SONG,
    addSingleSong, addSongsToState, removeSong, updateSong}