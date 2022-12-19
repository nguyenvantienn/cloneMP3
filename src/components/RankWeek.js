import { memo, useState } from "react"
import { useNavigate } from "react-router-dom"

import {List} from './'
// import path from '../ultis/path'

const RankWeek = ({data, hidenTitle, numberCut , subLink}) =>{
    const [showAll , setShowAll] = useState(false)
    const navigate = useNavigate();
    return(
        <>
            <div className='w-full'>
                {data?.filter((item,i)=>showAll?true:i<10)?.map((item,index)=>(
                    <List 
                        songData = {item}
                        key={item.encodeId}
                        hiden
                        order= {index + 1}
                        hidenTitle ={hidenTitle}
                        numberCut = {numberCut}
                    />
                ))}
            </div>
            <div className="flex justify-between items-center">
                <button
                    className='px-4 py-2 border border-[#0E8080] w-[150px] mx-auto bg- text-main-500 rounded-l-full rounded-r-full text-16 hover:text-white hover:bg-main-500'
                    onClick={()=>{
                        subLink ? navigate(subLink.split('.')[0]) : setShowAll(prev=>!prev)
                    }}
                >
                    {showAll?'Ẩn bớt':'Xem tất cả'}
                </button>
            </div>
        </>
    )
}

export default memo(RankWeek);