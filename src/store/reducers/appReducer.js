import actionTypes from '../actions/actionTypes'

const initState={
    banner : [],
    hArtistTheme: null,
    sunday : null,
    newEveryday : null,
    top100: null,
    hAlbum:null,
    corner:null,
    newRelease : null,
    weekChart : [],
    favoritedArtist :null,
    chart :null,
    rank : [],
    artistSpotlight : null,
    currentWidth: null
}

const appReducer =(state= initState,action) =>{
    switch(action.type){
        case actionTypes.GET_HOME :
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
                hArtistTheme: action.homeData?.find((item) => item.sectionId === 'hArtistTheme') || null ,
                sunday: action.homeData?.find((item) => item.sectionId === 'hAutoTheme1') || null ,
                newEveryday: action.homeData?.find((item) => item.sectionId === 'hAutoTheme2') || null ,
                top100: action.homeData?.find((item) => item.sectionId === 'h100') || null ,
                hAlbum: action.homeData?.find((item) => item.sectionId === 'hAlbum') || null ,
                corner: action.homeData?.find((item) => item.sectionId === 'hXone') || null ,
                newRelease :action.homeData?.find((item) => item.sectionType === 'new-release') || null,
                weekChart :action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || null,
                favoritedArtist :action.homeData?.find((item) => item.sectionId === 'hMix') || null,
                chart :action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || null,
                rank :action.homeData?.find((item) => item.sectionId === 'hZC')?.items || null,
                artistSpotlight : action.homeData?.find((item) => item.sectionType === 'artistSpotlight')?.items || null,
            }
        case actionTypes.CURRENT_WIDTH :
            return{
                ...state,
                currentWidth:action.payload,
            }
        default:
            return state;
    }
}


export default appReducer;
