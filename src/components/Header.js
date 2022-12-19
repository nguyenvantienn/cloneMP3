import {useNavigate} from 'react-router-dom'

import icons from "../ultis/icon";
import Search from "./Search";


const {HiOutlineArrowNarrowLeft,HiOutlineArrowNarrowRight} =icons 

const Header =() =>{
    const navigate = useNavigate();

    return(
        <div className="flex justify-between w-full items-center">
            <div className="flex gap-6 w-full">
                <div className="flex gap-6 items-center text-gray-400">
                    <span onClick={()=>{navigate(-1)}} ><HiOutlineArrowNarrowLeft size={24}/></span>
                    <span onClick={()=>{navigate(1)}}><HiOutlineArrowNarrowRight size={24}/></span>
                </div>
                <div className="w-1/2">
                    <Search />
                </div>
            </div>
            <div>
                Login
            </div>
        </div>
    )
}

export default Header;