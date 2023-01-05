import { memo,useState } from "react";
import { useSelector } from "react-redux";
// import {useNavigate} from 'react-router-dom'

import {SectionItem} from './'

const Section =({data , flexStart , hiden}) =>{

    const {currentWidth} = useSelector(state => state.app);
    // console.log(currentWidth);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold">{data?.title}</h3>
                { hiden ?<></>:<span className="text-xs">TẤT CẢ</span> }
            </div>
            <div  className={`flex items-start gap-[20px] ${flexStart?'justify-start':'justify-between'} `}>
                {data?.items?.filter((item,index)=>index< (currentWidth < 600 ? 3 : currentWidth < 800 ? 4 : 5))?.map((item)=>{
                    return(
                        <SectionItem key={item.encodeId} item={item} data={data} />
                    )
                })} 
            </div>
        </div>
    )
}

export default memo(Section);