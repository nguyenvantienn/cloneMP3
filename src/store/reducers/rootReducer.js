
import {combineReducers} from 'redux'
import { persistReducer,persistStpre } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './appReducer';
import musicReducer from './musicReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const commonConfig = {
    storage: storage ,
    stateReconciler:  autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist : ['curSongId','curSongData','curAlbumId','recentSongs']
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig,musicReducer)
})

export default rootReducer;