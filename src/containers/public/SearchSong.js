
import { useState,useEffect, memo } from "react";
import { useSelector } from "react-redux";

import { List, LoadingSong } from "../../components";
import * as apis from '../../apis'

const SearchSong = () =>{
    const [isLoad , setIsLoad] = useState(false)
    const [songsData, setsongsData] = useState();

    const {searchData} = useSelector(state=>state.music);
    console.log(searchData);
    // console.log(songsData);
    
    useEffect(()=>{
        setIsLoad(false);
        const fetchDetailPlaylist =async() =>{
            // const response = await apis.apiGetDetaiPlaylist(searchData?.top?.playlistId);
            const response = await apis.apiGetArtistSongs(searchData?.top?.id);
            setsongsData(response?.data?.data?.items);
            setIsLoad(true);
            console.log(response);
        }
        fetchDetailPlaylist();
    },[searchData?.top?.id])

    return (
        <>
            {!isLoad ?
                (<div className="flex h-[60%] items-center justify-center">
                    <LoadingSong width={46}/>
                </div>):(
                    <div className="w-[90%] mx-auto">
                        <h1 className="mb-[16px] text-[20px] text-black font-semibold">BÀI HÁT</h1>
                        <div className="flex flex-col">
                            {songsData?.map((song) => {
                                return <List songData={song} hiden key={song?.encodeId} />;
                            })}
				        </div>
                    </div>
                )
            }
        </>
    )
}

export default memo(SearchSong);