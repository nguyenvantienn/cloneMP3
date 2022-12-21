import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Scrollbars } from "react-custom-scrollbars-2";
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import icons from '../ultis/icon'
import {SongItem} from './'
import * as apis from '../apis'
import * as actions from '../store/actions'

const {ImBin} = icons

const SidebarRight =()=>{
    const [isRecent,setIsRecent] = useState(false)
    const [playlist , setPlaylist] = useState()

    const {curSongData,curAlbumId,isPlaying,recentSongs,curSongId} = useSelector(state => state.music);

    const dispatch = useDispatch()
    // console.log(curAlbumId);
    const fetchDetailPlaylist = async () =>{
        const response = await apis.apiGetDetaiPlaylist(curAlbumId)
        // console.log(response);
        if(response?.data?.err === 0){
            setPlaylist(response?.data?.data?.song?.items)
        }
    }
    useEffect(()=>{
        if(curAlbumId) fetchDetailPlaylist()
    },[])
    useEffect(()=>{
        if(curAlbumId && isPlaying) fetchDetailPlaylist();
    },[curAlbumId, isPlaying])

    useEffect(()=>{
        isPlaying && setIsRecent(false)
    },[isPlaying,curSongId])

    // console.log(recentSongs);
    return (
        <div className="flex flex-col text-[14px] w-full h-full">
            <div className="h-[70px] py-[14px] px-[8px] flex gap-8 items-center justify-between">
                <div className='flex flex-auto justify-center py-[6px] px-[6px] bg-main-200 rounded-l-full rounded-r-full cursor-pointer'>
                    <span
                        onClick={()=>{setIsRecent(false)}}
                        className={`flex justify-center flex-1 py-[5px] ${isRecent?'':'bg-main-100'} rounded-l-full rounded-r-full`}
                        >
                            Danh sách phát
                        </span>
                    <span
                        onClick={()=>{setIsRecent(true)}}
                        className={`flex justify-center flex-1 py-[5px] ${isRecent?'bg-main-100':''} rounded-l-full rounded-r-full`}
                        >
                            Nghe gần đây
                        </span>
                </div>
                <span
                    onClick={()=>{
                        dispatch(actions.setRecent('delete'))
                        setIsRecent(true)
                    }} 
                    className='rounded-full cursor-pointer p-2 hover:bg-main-100'><ImBin size={16}/></span>
            </div>
            {
                isRecent ?
                <Scrollbars autoHide style={{ width: "100%", height: "100%" }}> 
                    <div className='w-full flex flex-col px-[8px]'>
                    { recentSongs && recentSongs?.map((item)=>(
                                <SongItem
                                    key={item?.encodeId}
                                    thumbnail = {item?.thumbnail}
                                    title = {item?.title}
                                    artistsNames ={item?.artistsNames}
                                    encodeId ={item?.encodeId}
                                    sm
                                    // style='bg-main-500 text-white'
                                />
                    ))}
                    </div>
                </Scrollbars> 
                :
                <Scrollbars autoHide style={{ width: "100%", height: "100%" }}> 
                <div className='w-full flex flex-col px-[8px]'>
                    {curSongData &&  <SongItem
                        thumbnail = {curSongData?.thumbnail}
                        title = {curSongData?.title}
                        artistsNames ={curSongData?.artistsNames}
                        encodeId ={curSongData?.encodeId}
                        sm
                        style='bg-main-500 text-white'
                    />}
                    <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
                        <span className='text-sm font-bold'>Tiếp theo</span>
                        <span className='opacity-70 text-xs'>
                            <span>Từ playlist </span> 
                            <span className='font-semibold text-main-500'>
                                {curSongData?.album?.title?.length>30?`${curSongData?.album?.title.slice(0,30)}...`:curSongData?.album?.title}
                            </span> 
                        </span>
                    </div>
                        <div className='flex flex-col'>
                            {playlist?.map((item)=>(
                                <SongItem
                                    key={item?.encodeId}
                                    thumbnail = {item?.thumbnail}
                                    title = {item?.title}
                                    artistsNames ={item?.artistsNames}
                                    encodeId ={item?.encodeId}
                                    sm
                                    // style='bg-main-500 text-white'
                                />
                            ))}
                        </div>
                
                </div>
                </Scrollbars>
            }
            <div className='w-full h-[100px]'></div>
        </div>
    )
}

export default memo(SidebarRight);