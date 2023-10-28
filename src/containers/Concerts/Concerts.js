import {connect} from "react-redux";
import Concerts from "../../components/Concerts/Concerts";


// const mapStateToProps = (state) => {
//     return {
//         songs: state.songs,
//         instruments: state.instruments,
//         auth: state.auth,
//         pagination: state.songsPagination
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addSongsToState: (songs) => dispatch(addSongsToState(songs)),
//         removeSongFromState: (song) => dispatch(removeSong(song)),
//         addInstrumentsToState: (instruments) => dispatch(addInstrumentsToState(instruments)),
//         addPagination: pagination => dispatch(addSongsPaginationToState(pagination))
//     }
// }

export default connect(null, null)(Concerts)