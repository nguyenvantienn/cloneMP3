import { useState,useEffect,memo } from "react";
import { useSelector } from "react-redux";

import * as apis from '../../apis'
import {LoadingSong ,SectionItem} from '../../components' 

const SearchPlaylist = () =>{
    const [isLoad,setIsLoad] = useState(false);
    const [playlistData,setPlaylistData] = useState();
    const {searchData} = useSelector(state=>state.music);
    console.log(searchData);

    useEffect(()=>{
        setIsLoad(false);
        const fetchDetailPlaylist =async() =>{
            // const response = await apis.apiGetDetaiPlaylist(searchData?.top?.playlistId);
            const response = await apis.apiGetArtist(searchData?.top?.alias);
            setPlaylistData(response?.data?.data?.sections[1]?.items);
            setIsLoad(true);
            console.log(response);
        }
        fetchDetailPlaylist();
    },[searchData?.top?.alias])
    return (
        <>
            {!isLoad ?
                (<div className="flex h-[60%] items-center justify-center">
                    <LoadingSong width={46}/>
                </div>):(
                    <div className="flex flex-col w-full px-[48px] mx-auto">
                    {/* <h3 className="text-[20px] font-semibold mb-5">PlayLists/Album</h3> */}
                        <h1 className="mb-[16px] text-[20px] p-[12px] text-black font-semibold">PlayLists/Album</h1>
                        <div className="w-full flex items-start flex-wrap">
                            {playlistData?.map((item,index) =>(
                                // <div key={item.encodeId} className={`flex-auto ${index%2?'pl-2':'pr-2'}`}>
                                    <SectionItem key={item.encodeId} item={item} style />
                                // </div>
                            ))}
                        </div>
                </div>)
            }
        </>
    )
}

export default memo(SearchPlaylist);