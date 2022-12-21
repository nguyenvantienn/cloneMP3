
import { useState,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import moment from 'moment'

import * as apis from '../apis'
import icons from '../ultis/icon'
import * as actions from '../store/actions'
import {LoadingSong} from './'


const {AiFillHeart,AiOutlineHeart,TbDots,MdSkipNext,MdSkipPrevious,CiRepeat,CiShuffle, BsFillPlayFill,BsPauseFill ,TbRepeatOnce,BsMusicNoteList,FiVolume2,FiVolumeX} =icons
var intervalId;

const Player =({setShowSidebarRight}) =>{
    const [songInfo,setSongInfo] = useState(null);
    const [checkHeart,setCheckHeart] = useState(false);
    const [curSeconds,setCurSeconds] = useState(0);
    const [isShuffle,setIsShuffle] = useState(false);
    const [repeatMode,setRepeatMode] = useState(0);
    const [isLoadedSource,setIsLoadedSource] = useState(true)
    const [volume,setVolume] = useState(50);
    const [audio,setAudio] = useState(new Audio())
    
    const {curSongId,isPlaying,playlist} = useSelector(state => state.music);
    // const audioEl = useRef(new Audio());
    const dispatch =useDispatch()
    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeRef = useRef();

    // console.log(audio);
    // console.log(isPlaying);

    //Load music first

    //Load music
    useEffect(()=>{
        const fetchDetailSong = async () => {
            setIsLoadedSource(false);
            const [res1,res2] = await Promise.all([
                apis.apiGetDetaiSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            setIsLoadedSource(true);
            if(res1.data.err ===0){
                setSongInfo(res1.data.data);
                dispatch(actions.setCurSongData(res1.data.data))
            } 
            if(res2.data.err ===0){
                audio.pause()
                setAudio(new Audio(res2.data.data['128']));
            }else{
                audio.pause()
                setAudio(new Audio());
                dispatch(actions.play(false));
                setCurSeconds(0);
                thumbRef.current.style.cssText = `right:100%`;
                alert(res2.data.msg);
            }
        }   

        fetchDetailSong();
    },[curSongId]);


    useEffect(()=>{
        intervalId && clearInterval(intervalId);
        audio?.pause(); 
        audio?.load();
        audio.currentTime = 0;
        audio.volume = +volume /100 ;
        setVolume(prev=>{
            return +prev;
        });
        //Load propress Bar
        intervalId = setInterval(()=>{
            let percent;
            percent = Math.round(audio?.currentTime *10000/ songInfo?.duration)/100;
            // console.log(percent);
            if(thumbRef.current){
                thumbRef.current.style.cssText = `right : ${100 - percent}%`;
            }
            // console.log(audio.currentTime)
            setCurSeconds(Math.round(audio?.currentTime));
        },400)
        if (isPlaying) {
            audio?.play();
            //Load propress Bar
            // intervalId = setInterval(()=>{
            //     let percent;
            //     percent = Math.round(audio?.currentTime *10000/ songInfo.duration)/100;
            //     // console.log(percent);
            //     thumbRef.current.style.cssText = `right : ${100 - percent}%`;
            //     // console.log(audio.currentTime)
            //     setCurSeconds(Math.round(audio?.currentTime));
            // },400)
        }
    },[audio])

    useEffect(()=>{
        const handleEnded = ()=>{
            // console.log('end');
            if(isShuffle){
                // console.log('Shuffle');
                handleShuffle()
            }else if(repeatMode){
                // console.log('repeat')
                repeatMode === 2? handleRepeatOne() : handleClickNextSong();
            }else{
                audio.pause();
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended',handleEnded);

        return ()=>{
            audio.removeEventListener('ended',handleEnded);
        }
    },[audio, isShuffle , repeatMode])

    //Set Volume
    useEffect(()=>{
        audio.volume = +volume /100 ;
        if(volume >0){
            volumeRef.current = volume;
        }
    },[volume])


    // console.log(isPlaying);
    const handleClickPlaying = async () => {
        if(isPlaying){
            // console.log('Pause');
            audio.pause()
            dispatch(actions.play(false))
        }else{
            // console.log('Play');
            audio.play();
            dispatch(actions.play(true));

        }
        
    }

    const handleClickPressBar =(e) =>{
        var trackRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round((e.clientX - trackRect.left)*10000/trackRect.width)/100;
        thumbRef.current.style.cssText = `right : ${100 - percent}%`;
        audio.currentTime = percent * songInfo.duration /100 ;
        setCurSeconds(Math.round(percent * songInfo.duration /100 ));        
        // console.log(percent);
    }

    //Prev Song
    const handleClickPrevSong =() =>{
        if(playlist){
            let currentSongIndex = playlist?.findIndex((item)=>item.encodeId === curSongId)
            console.log(currentSongIndex);
            dispatch(actions.setCurSongId(playlist[currentSongIndex >0 ? currentSongIndex - 1:currentSongIndex].encodeId))
            dispatch(actions.play(true));
        }
    }

    //Next Song
    const handleClickNextSong =() =>{
        if(playlist){
            let currentSongIndex = playlist?.findIndex((item)=>item.encodeId === curSongId)
            // console.log(currentSongIndex);
            dispatch(actions.setCurSongId(playlist[currentSongIndex < playlist?.length ? currentSongIndex + 1:currentSongIndex].encodeId))
            dispatch(actions.play(true));
        }
    }

    //Random Song
    const handleShuffle = () =>{
        const randomIndex = Math.round(Math.random()*playlist?.length) - 1;
        // console.log(playlist[randomIndex].encodeId);
        dispatch(actions.setCurSongId(playlist[randomIndex].encodeId))
        dispatch(actions.play(true));
    }
    
    // Repeat One Song
    const handleRepeatOne =() =>{
        console.log('repeat one');
        audio.play()
    }


    return(
        <div className="box-border h-full bg-main-400 px-5 py-2 flex">
            <div className="w-[30%] flex gap-3 items-center flex-auto">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded-md" />
                <div className="flex flex-col">
                    <span className="font-semibold text-[14px] text-gray-700">{songInfo?.title}</span>
                    <span className="text-[12px] text-gray-500">{songInfo?.artistsNames}</span>
                </div>
                <div className="flex gap-3 pl-2">
                        {!checkHeart?
                            <AiOutlineHeart size={16} onClick={()=>{setCheckHeart(!checkHeart)}} />
                            :<AiFillHeart size={16} onClick={()=>{setCheckHeart(!checkHeart)}} />
                            
                        }
                        <TbDots size={16}/>  
                </div>   
            </div>
            <div className="w-[40%] flex-auto flex flex-col justify-center items-center gap-1">
                <div className="flex items-center gap-6 ">
                    <span
                        onClick={()=>{setIsShuffle(!isShuffle)}}  
                        className={`cursor-pointer ${isShuffle ? 'text-black' :'text-gray-600'}`}  
                        title="Bật phát ngẫu nhiên">
                        <CiShuffle size={22}/> 
                    </span>
                    <span
                        onClick={handleClickPrevSong} 
                        className={`${playlist?'cursor-pointer':'text-gray-500'}`} 
                    >
                        <MdSkipPrevious size={22}/>
                    </span>
                    <span 
                        onClick={handleClickPlaying}
                        className="p-1 rounded-full cursor-pointer hover:text-main-500"
                    >
                        { !isLoadedSource ? 
                            <LoadingSong width={20}/> :
                            isPlaying?<BsPauseFill size={34}/>:<BsFillPlayFill size={34}/>}
                    </span>
                    <span 
                        className={`${playlist?'cursor-pointer':'text-gray-500'}`} 
                        onClick={handleClickNextSong}
                        >
                        <MdSkipNext size={22}/>
                    </span>
                    <span 
                        className={`cursor-pointer ${repeatMode ? 'text-black' :'text-gray-600'}`}  
                        title="Bật phát lại tất cả"
                        onClick={()=>{setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}}
                    >
                        {/* {repeatMode === 1 ? <TbRepeatOnce/> : <CiRepeat/>} */}
                        { repeatMode ===2 ? <TbRepeatOnce size={22}/>:<CiRepeat size={22}/>}
                    </span>
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                    <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
                    <div
                        onClick={handleClickPressBar}
                        className="w-[60%] relative  h-[3px] hover:h-[7px] cursor-pointer rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.1)]"
                        ref ={trackRef}
                    >
                        <div ref={thumbRef} className=" absolute top-0 bottom-0 left-0 rounded-l-full rounded-r-full bg-[#0e8080]"></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
                </div>
            </div>
            <div className="w-[30%] flex-auto flex gap-2 items-center justify-end">
                <span title={volume} onClick={()=>{setVolume(prev => +prev>0?0:+volumeRef.current)}}>{+volume >0 ?<FiVolume2 size={20}/> : <FiVolumeX size={20}/>}</span>
                <input 
                    title={volume}
                    type="range" step={1} min ={0} max={100}
                    value={+volume}
                    onChange ={(e)=>{setVolume(+e.target.value)}}
                />
                <span 
                    className="p-1 rounded-sm bg-main-500 opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={()=>{setShowSidebarRight(prev => !prev)}}
                >
                    <BsMusicNoteList size={20}/>
                </span>
            </div>
        </div>
    )
}

export default Player;