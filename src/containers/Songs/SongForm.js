import {connect} from "react-redux";
import SongForm from "../../components/Songs/SongForm";
import {addSingleSong, updateSong} from "../../redux/actions/songs";

const mapStateToProps = (state) => {
    return {
        instruments: state.instruments,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSongToState: (song) => dispatch(addSingleSong(song)),
        updateSongInState: (song) => dispatch(updateSong(song))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongForm)