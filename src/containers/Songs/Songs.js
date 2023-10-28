import {connect} from "react-redux";
import Songs from "../../components/Songs/Songs";
import {addInstrumentsToState} from "../../redux/actions/instruments";
import {addSongsToState, removeSong} from "../../redux/actions/songs";
import {addSongsPaginationToState} from "../../redux/actions/songsPagination";

const mapStateToProps = (state) => {
    return {
        songs: state.songs,
        instruments: state.instruments,
        auth: state.auth,
        pagination: state.songsPagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSongsToState: (songs) => dispatch(addSongsToState(songs)),
        removeSongFromState: (song) => dispatch(removeSong(song)),
        addInstrumentsToState: (instruments) => dispatch(addInstrumentsToState(instruments)),
        addPagination: pagination => dispatch(addSongsPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs)