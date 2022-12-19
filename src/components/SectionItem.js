
import { memo,useState, useRef } from "react";
// import { useSelector } from "react-redux";
import {useNavigate,Link} from 'react-router-dom'

import icons from '../ultis/icon'

const {AiFillHeart,AiOutlineHeart,TbDots,BsFillPlayFill} =icons

const SectionItem = ({item, data, style}) => {
    const [isHover,setIsHover] = useState(false);
	const navigate = useNavigate()

    const imageRef = useRef();

    const hadleEnter = () =>{
        setIsHover(item.encodeId);
        imageRef.current.classList.remove('animate-scale-down-image');
        imageRef.current.classList?.add('animate-scale-up-image');
    }
    const handleLeave = () =>{
        setIsHover(null);
        imageRef.current.classList?.remove('animate-scale-up-image');
        imageRef.current.classList?.add('animate-scale-down-image');

    }

    return (
        <div
            // key={item.encodeId}
            onClick={()=>{
                navigate(item?.link?.split('.')[0],{state :{ playAlbum : false }});
            }}
            className ={`flex flex-col items-center gap-2 w-1/5 text-[14px] cursor-pointer ${style?'px-3':''}`}
        >
            <div 
                className="w-full relative overflow-hidden rounded-lg"
                onMouseEnter={hadleEnter}
                onMouseLeave={handleLeave}
            >
                {isHover===item.encodeId ?
                    <div className="absolute z-40 right-0 left-0 bottom-0 top-0 bg-overlay-30 rounded-lg flex gap-[7px] items-center text-white justify-center">
                        <span><AiOutlineHeart size={24}/></span>
                        <span 
                            onClick={(e)=>{
                                e.stopPropagation()
                                navigate(item?.link?.split('.')[0],{state :{ playAlbum : true }});
                            }}
                            className="border border-white rounded-full p-1"><BsFillPlayFill size={34}/></span>
                        <span><TbDots size={24}/></span>
                    </div>:null}
                <img ref={imageRef} src={item?.thumbnailM} alt="image" className="w-full object-contain rounded-lg" />
            </div>
            <span className='flex flex-col'>
                <span className="font-semibold">{item.title.length >30? `${item.title.slice(0,30)}...`:item.title}</span>
                { data?.sectionId === 'h100' ?
                <div className="flex flex-wrap">
                    {item?.artists.filter((item,index)=>index<3).map((item)=><Link to={item.link} onClick={(e)=>{e.stopPropagation()}} key={item?.id}>{`${item?.name} , `}</Link>)}
                    <span>...</span>
                </div>
                    : <span>{item?.sortDescription.length>40?`${item?.sortDescription.slice(0,40)}...`:item?.sortDescription}</span>}
            </span>       
        </div>
    )
}

export default memo(SectionItem)