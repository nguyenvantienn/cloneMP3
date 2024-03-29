import {NavLink} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import path from '../ultis/path'
import logo from '../assets/logo.svg'
import zingMp3 from '../assets/zingmp3.png'
import {sidebarMenu} from '../ultis/menu'


const notActiveStyle = 'py-2 px-[25px] font-bold text-[#323230] text-[13px] flex gap-[12px] items-center';
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center';

const SidebarLeft =()=>{

    const navigate = useNavigate()
    return (
        <div className='h-full flex flex-col bg-main-200'>
            <div onClick={()=>{navigate(`${path.HOME}`)}} className='w-full h-[70px] py-[15px] min-[1130px]:px-[25px] flex justify-start items-center cursor-pointer'>
                <img src={logo} alt="ZingMP3" className='w-[120px] h-10 hidden 1130:flex'/>
                <img src={zingMp3} alt="ZingMP3" className='w-[40px] h-[40px] min-[1130px]:hidden object-cover mx-auto'/>

            </div>
            <div className='flex flex-col'>
                {sidebarMenu.map((item)=>{
                    return(
                        <NavLink
                            key={item.path}
                            end={item.end}
                            to={item.path}
                            className={({isActive}) => isActive ? activeStyle : notActiveStyle}
                            title={item.text}
                        >
                            {item.icon}
                            <span className='hidden min-[1130px]:inline min-[1130px]:items-center'>{item.text}</span>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default SidebarLeft;