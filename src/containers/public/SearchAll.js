
import { useSelector } from "react-redux";

import {SongItem , List, SectionItem , Artist} from '../../components'
import {handleNumber} from '../../ultis/fn'
import icons from '../../ultis/icon'

const {AiOutlineUserAdd} = icons

const SearchAll = () =>{
    const {searchData} = useSelector(state =>state.music)

    // console.log(searchData);
    return (
        <div className="w-full flex flex-col gap-[30px] px-[60px]">
            <div className="flex flex-col">
                <h3 className="text-lg font-bold mb-5">Nổi bật</h3>
                <div className="flex gap-8">
                    {searchData?.top && <div className="p-[10px] flex-1 bg-main-200 rounded-md flex gap-8 items-center cursor-pointer">
                        <img src={searchData.top.thumbnail} alt="avatar" className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' ? 'rounded-full':''}`} />    
                        <div className="flex flex-col text-xs">
                            <span className="mb-[6px]">{searchData.top.objectType === 'artist' ? 'Nghệ sĩ':''}</span>
                            <span className="text-sm font-semibold">{searchData.top.title || searchData.top.name}</span>
                            {searchData.top.objectType === 'artist' && <span>{handleNumber(searchData?.artists[0]?.totalFollow) + ' quan tâm'}</span>}
                        </div>
                    </div>}
                    {searchData?.songs?.filter((item,index)=>index<2).map((item)=>{
                        return(
                            <div key={item.encodeId} className="p-[10px] flex-1 bg-main-200 rounded-md flex gap-8 items-center">
                                <SongItem
                                    thumbnail ={item.thumbnail} 
                                    artistsNames ={item.artistsNames}
                                    encodeId = {item.encodeId} 
                                    title ={item.title}
                                    size='w-[84px] h-[84px] object-cover'
                                    style
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col w-full">
                    <h3 className="text-lg font-bold mb-5">Bài Hát</h3>
                    <div className="flex justify-between flex-wrap w-full">
                        {searchData?.songs?.filter((item,index)=>index<6).map((item,index) =>(
                            <div key={item.encodeId} className={`flex-auto w-[45%] ${index%2?'pl-2':'pr-2'}`}>
                                <List songData={item} hiden hidenTitle/>
                            </div>
                        ))}
                    </div>
            </div>
            <div className="flex flex-col w-full">
                    <h3 className="text-lg font-bold mb-5">PlayLists/Album</h3>
                    <div className="flex items-start justify-between gap-[20px]">
                        {searchData?.playlists?.filter((item,index)=>index<5).map((item,index) =>(
                            // <div key={item.encodeId} className={`flex-auto ${index%2?'pl-2':'pr-2'}`}>
                                <SectionItem key={item.encodeId} item={item} />
                            // </div>
                        ))}
                    </div>
            </div>
            <div className="flex flex-col w-full">
                    <h3 className="text-lg font-bold mb-5">Nghệ sĩ</h3>
                    <div className="flex gap-[20px]">
                        {searchData?.artists?.filter((item,index)=>index<5).map((item) =>(
                            // <div key={item.encodeId} className={`flex-auto ${index%2?'pl-2':'pr-2'}`}>
                                <Artist 
                                    key={item.id}
                                    image={item.thumbnailM}
                                    title={item.name}
                                    follower={item.totalFollow}
                                    link={item.link}
                                />
                            // </div>
                        ))}
                    </div>
            </div>
            <div className="w-full h-[90px]"></div>
        </div>
    )
}

export default SearchAll;