import {Outlet} from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import {MemuSearch} from '../../ultis/menu'
import { useSelector } from 'react-redux';

const activeStyle = 'text-[24px] text-main-500 font-semibold cursor-pointer border-b-2 border-green-800 py-[15px]'
const notActiveStyle ='text-[24px] text-black font-semibold cursor-pointer py-[15px]'

const Search = () =>{

    const {keywordSearch} = useSelector(state=>state.music);
    console.log(keywordSearch);
    
    return (
        <div className='w-full'>
            <div className='flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1'>
                <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả tìm kiếm</span>
                <div className='flex items-center gap-5'>
                    {MemuSearch.map(item =>(
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${keywordSearch.replace(' ','+')}`}
                            className={({isActive})=>isActive?activeStyle :notActiveStyle}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                    <Outlet/>
            </div>
        </div>
    )
}

export default Search;