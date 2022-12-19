
// import actionType from './actionType'
import * as apis from '../../apis'
import actionTypes from './actionTypes';

export const setCurSongId = (songId) =>({
    type : actionTypes.SET_CUR_SONG_ID,
    payLoad: songId
})

export const setCurSongData = (songData) =>({
    type : actionTypes.SET_CUR_SONG_DATA,
    payLoad: songData
})

export const setCurAlbumId = (pid) =>({
    type : actionTypes.SET_CUR_ALBUM_ID,
    payLoad: pid
})

export const setRecent = (data) =>({
    type : actionTypes.SET_RECENT,
    payLoad: data
})



export const play = (flag) =>({
    type : actionTypes.SET_PLAYING,
    payLoad: flag
})

export const playAlbum = (flag) =>({
    type : actionTypes.SET_ALBUM,
    payLoad: flag
})

export const setPlaylist = (songs) => ({
    type : actionTypes.ADD_PLAYLIST,
    payLoad : songs
}) 

export const search = (keyword) => async(dispatch) => {
    try {
        const response = await apis.apiSearch(keyword);
        if(response.data.err === 0){
            dispatch({
                type : actionTypes.SEARCH,
                payLoad : response,
                keyword
            })
        }else{
            dispatch({
                type: actionTypes.SEARCH,
                payLoad :null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            payLoad :null
        })
    }
}
// export const fetchDetailPlaylist = (pid) => async (dispatch) =>{
//     try {
//         const response = await apis.apiGetDetaiPlaylist(pid);
//         if(response?.data.err === 0 ){
//             dispatch({
//                 type :actionTypes.ADD_PLAYLIST,
//                 payLoad:response?.data?.data?.song?.items
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type : actionTypes.ADD_PLAYLIST,
//             payLoad : null
//         })
//     }
// }