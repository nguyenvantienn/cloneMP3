
import { memo } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from '../store/actions'

import 'moment/locale/vi'

const SongItem = ({thumbnail , artistsNames ,encodeId, title ,releaseDate ,isPrivate,order,percent,style ,sm, size}) =>{
    // console.log(data.encodeId);
    // const {thumbnail , artistsNames ,encodeId, title ,releaseDate ,isPrivate} = data;
    const dispatch = useDispatch();
    // console.log(data);
    return (
        <div
            className={`w-full flex items-center justify-between gap-2 flex-auto p-[10px] cursor-pointer rounded-md ${style || 'text-black hover:bg-main-200'}`}
            onClick={()=>{
                // console.log(data);
                dispatch(actions.setCurSongId(encodeId));
                dispatch(actions.play(true))
				dispatch(actions.setRecent({thumbnail,artistsNames,title,encodeId}))

            }}
        >
            <div className="w-full flex gap-3 items-center">
                {order && <span className={`${order ===1?'text-shadow-no1':order===2?'text-shadow-no2':'text-shadow-no3'}  text-[rgba(77,34,104,0.9)]  text-[32px] `}>{order}</span> }
                <div className= "w-[60px] flex-none">
                    <img src={thumbnail} alt="thumbnai" className={`${sm?'w-[40px] h-[40px]':size?size:'w-[60px] h-[60px]'} object-conver rounded-md`} />
                </div>
                <div className="max-w-[100%] flex flex-col flex-auto">
                    <span className="w-full text-[14px] font-semibold truncate">{title?.length>20?`${title?.slice(0,20)}...`:title} {isPrivate?'(Vip)':''}</span>
                    {/* <span className="w-full text-[14px] font-semibold truncate">{title} {isPrivate?'(Vip)':''}</span> */}
                    <span className="w-full text-[12px] opacity-70 truncate">{artistsNames}</span>
                    { releaseDate&&<span className="text-12 text-gray-700">{moment.utc(releaseDate * 1000).fromNow()}</span> }
                </div>
            </div>
            {percent && <span className="font-bold">{`${percent}%`}</span>}
        </div>
    )
}

export default memo(SongItem);