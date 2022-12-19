import icons from './icon'

const {MdOutlineLibraryMusic,HiOutlineChartPie,MdOutlineFeed,TbChartArcs} =icons

export const sidebarMenu =[
    {
        path:'mymusic',
        text:'Cá Nhân',
        icon:<MdOutlineLibraryMusic size={24}/>
    },
    {
        path:'',
        text:'Khám Phá',
        end : true,
        icon:<TbChartArcs  size={24}/>
    },
    {
        path:'zing-chart',
        text:'#zingchart',
        icon:<HiOutlineChartPie  size={24}/>
    },
    {
        path:'follow',
        text:'Theo Dõi',
        icon:<MdOutlineFeed  size={24}/>
    }   
];   


export const MemuSearch =[
    {
        path:'tat-ca',
        text:'TẤT CẢ',
    },
    {
        path:'bai-hat',
        text:'BÀI HÁT',
        end : true,
    },
    {
        path:'playlist',
        text:'PLAYLIST/ALBUM',
    }
];   