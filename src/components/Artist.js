import { memo, useState  } from "react"
import {Link} from 'react-router-dom'

import {handleNumber} from '../ultis/fn'
import icons from '../ultis/icon'

const {AiOutlineUserAdd} = icons

const Artist = ({image, title, follower, link ,setwidth}) =>{
    const [isHover,setIsHover] = useState(false);

    return(
        <div className={`${setwidth?'w-full':'w-1/5'} flex flex-col items-center justify-between gap-[15px] cursor-pointer`}>
            <Link
                to={link} 
                onMouseEnter={()=>{setIsHover(true)}}
                onMouseLeave={()=>{setIsHover(false)}}
                className="relative w-full overflow-hidden rounded-full"
            >
                <img src={image} alt="Avarta-singer" className={`w-full object-contain rounded-full ${isHover?'animate-scale-up-image':'animate-scale-down-image'}`} />
                { isHover?<div className="absolute top-0 right-0 left-0 bottom-0 bg-overlay-30 rounded-full"></div>:''}
            </Link>
            <div className="flex flex-col items-center gap-1">
                <Link to={link} className="text-sm font-medium text-center hover:underline hover:text-main-500">{title}</Link>
                <span className="text-xs opacity-70">{handleNumber(follower)}</span>
                <button
                    type="button"
                    className= " bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
                >
                    <AiOutlineUserAdd size={16}/>
                    <span className="text-xs opacity-90">Quan Tâm</span>
                </button>
            </div>
        </div>
    )
}

export default memo(Artist);