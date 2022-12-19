
import {useState} from 'react'
import { useDispatch} from 'react-redux';
import {useNavigate,createSearchParams} from 'react-router-dom'

import path from '../ultis/path'
import icons from "../ultis/icon";
import * as actions from '../store/actions'

const {TfiSearch ,TfiClose} =icons
const Search =() =>{
    const [keyWord,setKeyWord] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = async(e) =>{
        if(e.keyCode === 13 && keyWord){
            // console.log(e.target.value);
            dispatch(actions.search(keyWord))
            navigate({
                pathname : `/${path.SEARCH}/${path.ALL}`,
                search : createSearchParams({
                    q: keyWord
                }).toString()
            
            });
            setKeyWord('');
        }
    }

    return(
        <div className="w-full flex items-center">
            <span className="h-10 pl-4 flex items-center rounded-l-[20px] text-gray-500 bg-[#DDE4E4]">
                <TfiSearch size={24}/> 
            </span>
            <input
                type="text" 
                className="outline-none bg-[#DDE4E4] px-4 py-2 w-full  h-10 text-gray-500 placeholder:text-13px]"
                placeholder="Tìm kiếm bài hái, nghệ sĩ, lời bài hát..."
                value={keyWord}
                onChange={(e)=>{setKeyWord(e.target.value)}}
                onKeyUp = {handleSearch}
            />
            <span 
                onClick={()=>{setKeyWord('')}}
                className="h-10 pr-4 flex items-center rounded-r-[20px] bg-[#DDE4E4] text-black text-[24px] cursor-pointer"
            >
                {keyWord? <TfiClose size={18}/> :''}
            </span>
        </div>
    )
}
export default Search;