import actionTypes from '../actions/actionTypes'

const initState={
    curSongId : null,
    curSongData : null,
    curAlbumId :null,
    isPlaying : false,
    atAlbum: false,
    playlist :null,
    recentSongs : [],
    searchData : {},
    keywordSearch : ''
}   

const musicReducer =(state= initState,action) =>{
    switch(action.type){
        case actionTypes.SET_CUR_SONG_ID :
            return {
                ...state,
                curSongId:action.payLoad|| null
            }
        case actionTypes.SET_PLAYING :
            return {
                ...state,
                isPlaying:action.payLoad
            }
        case actionTypes.SET_ALBUM :
            return {
                ...state,
                atAlbum:action.payLoad
            }
        case actionTypes.ADD_PLAYLIST :
            return {
                ...state,
                playlist:action.payLoad || null
            }
        case actionTypes.SET_CUR_SONG_DATA :
            return {
                ...state,
                curSongData:action.payLoad || null
            }   
        case actionTypes.SET_CUR_ALBUM_ID :
            return {
                ...state,
                curAlbumId:action.payLoad || null
            }   
        case actionTypes.SET_RECENT :
            let copySong = state.recentSongs;
            if(action.payLoad === 'delete'){
                return {
                    ...state,
                    recentSongs : []
                }
            }else{
                let check = copySong ? copySong.some((item)=>item.encodeId === action.payLoad.encodeId) : false;
                copySong.length >=15 && copySong.pop()
                return {
                    ...state,
                    recentSongs : action.payLoad && !check ? [ action.payLoad , ...copySong ] : copySong
                }
            }
        case actionTypes.SEARCH :
            return {
                ...state,
                searchData:action.payLoad?.data?.data || {},
                keywordSearch :action.keyword ||'',
            } 
        default:
            return state;
    }
}


export default musicReducer;
