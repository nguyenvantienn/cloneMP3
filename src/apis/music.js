
import axios from '../axios'

export const apiGetDetaiSong = (songId) =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/Infosong',
            method: 'get',
            params:{id:songId}
        })
        resolve(response)
    }catch(error){
        reject(error);
    }

})

export const apiGetSong = (songId) =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/song',
            method: 'get',
            params:{id:songId}
        })
        resolve(response)
    }catch(error){
        reject(error);
    }

})


export const apiGetDetaiPlaylist = (playid) =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/detailPlaylist',
            method: 'get',
            params:{id:playid}
        })
        resolve(response)
    }catch(error){
        reject(error);
    }

})

export const apiSearch = (keyword) =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/search',
            method: 'get',
            params:{keyword}
        })
        resolve(response)
    }catch(error){
        reject(error);
    }

})

export const apiGetArtist = (artist) =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/artist',
            method: 'get',
            params:{name:artist}
        })
        resolve(response)
    }catch(error){
        reject(error);
    }

})

export const apiGetArtistSongs = (singerId) =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/artistsong',
            method: 'get',
            params:{
                id: singerId,
                page:1,
                count:50
            }
        })
        resolve(response)
    }catch(error){
        reject(error);
    }
})

export const apiGetChartHome = () =>new Promise(async(resolve,reject)=>{
    try{
        const response = await axios({
            url: '/charthome',
            method: 'get',
        })
        resolve(response)
    }catch(error){
        reject(error);
    }

})