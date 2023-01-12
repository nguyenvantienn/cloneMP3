
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { memo } from "react";

import {Button,SongItem} from './'

const NewRelease = () =>{
    const [isActive, setIsActive] = useState(true)
    const {newRelease} = useSelector(state=>state.app);
    const [songs,setSongs] = useState([])

    useEffect(()=>{
        isActive ? setSongs(newRelease?.items?.vPop) : setSongs(newRelease?.items?.others)
    },[isActive,newRelease])

    // console.log(songs);
    return (
        <div className="mt-[12px] px-[59px] flex flex-col gap-5 w-full" >
            <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold">{newRelease?.title}</h3>
                <span className="text-xs">TẤT CẢ</span>
            </div>
            <div className="flex items-center gap-5 text-[12px]">
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActive ?'bg-blue-500 text-white':null}`}
                    onClick={()=>{setIsActive(true)}}
                >
                    VIỆT NAM
                </button>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActive ? null :'bg-blue-500 text-white'}`}
                    onClick={()=>{setIsActive(false)}}

                >
                    QUỐC TẾ
                </button>
            </div>
            <div className="flex flex-wrap w-full justify-between">
                    {songs?.filter((item,index)=>index<12)?.map((item)=>(
                        <div key={item?.encodeId} className="w-[45%] min-[1024px]:w-[30%]">
                            <SongItem 
                            thumbnail={item.thumbnail}
                            artistsNames={item.artistsNames}
                            encodeId={item.encodeId}
                            title={item.title} 
                            releaseDate={item.releaseDate}
                            isPrivate={item.isPrivate}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default memo(NewRelease);