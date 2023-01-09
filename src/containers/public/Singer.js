
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import moment from 'moment'

import * as apis from '../../apis'
import icons from '../../ultis/icon'
import {LoadingSong, SongItem , Section , Artist} from '../../components'
import 'moment/locale/vi'

const {AiOutlineUserAdd ,BsFillPlayFill} = icons

const Singer = () =>{
    const [isLoad,setIsLoad] = useState(false);
    const [dataSinger , setDataSinger] = useState();
    const {singer} = useParams();
    // console.log(singer);
    useEffect(()=>{
        setIsLoad(false)
        const fetchDetailArtist = async()=>{
            const response = await apis.apiGetArtist(singer);
            if(response.data.err === 0){
                setDataSinger(response?.data?.data)
                // console.log(response);
            }
            setIsLoad(true);
            
        }
        singer && fetchDetailArtist()
    },[singer])
    // console.log(dataSinger);
    return(
        <div className='flex flex-col w-full relative'>
            {!isLoad ?
                (<div className="flex h-[60%] items-center justify-center mt-16">
                    <LoadingSong width={46}/>
                </div>):
                    <>
                        <div className='relative w-full'>
                            <img src={dataSinger?.cover} alt="background-cover" className='w-full h-[400px] object-cover'/>
                            <div className='text-white absolute px-[60px] top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent'>
                                <div className='absolute bottom-[28px] '>
                                    <div className='flex gap-2 items-center mb-1'>
                                        <span className='font-bold text-[40px]'>{dataSinger?.name}</span>
                                        <span  className="p-[6px] border border-white rounded-full cursor-pointer hover:text-main-500">
                                            <BsFillPlayFill size={34}/>
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-3 text-gray-300'> 
                                        <span>{`${Number(dataSinger?.totalFollow.toFixed(1)).toLocaleString()} nguời quan tâm`}</span>
                                        <button
                                            type="button"
                                            className= " bg-gray-500 px-4 py-2 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
                                        >
                                            <AiOutlineUserAdd size={16}/>
                                            <span className="text-[14px] opacity-90">Quan Tâm</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {dataSinger?.sections ? (<><div className='w-full mt-[30px] px-[60px] flex justify-between'>
                            <div className='w-[40%] flex-auto pr-8'>
                                <h3 className='text-[20px] mb-5 font-bold'>Bài Hát Mới Nhất</h3>
                                <div className='flex max-[1100px]:flex-col gap-4 rounded-md bg-[#C4CDCC] p-4 pl-[18px]'>
                                    <img src={dataSinger?.sections[0]?.items[0]?.thumbnail} alt="Thubnail" className='w-[151px] h-[151px] object-cover rounded-md' />
                                    <div className='flex flex-col text-xs text-black gap-[3px] opacity-80 pt-[16px]'>
                                        <div className='flex flex-col mt-[4px]'>
                                            <span className='text-[16px] font-bold opacity-100'>{dataSinger?.sections[0]?.items[0]?.title}</span>
                                            <span>{dataSinger?.sections[0]?.items[0]?.artistsNames}</span>
                                        </div>
                                        <span>{moment(dataSinger?.sections[0]?.items[0]?.releaseDate * 1000).format('DD-MM-YYYY')}</span>
                                        <span>{moment.utc(dataSinger?.sections[0]?.items[0]?.releaseDate * 1000).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[60%] flex-auto'>
                                <h3 className='text-[20px] mb-5 font-bold'>Bài Hát Nổi Bật</h3>
                                {/* <div className='flex gap-4 rounded-md bg-[#C4CDCC] p-4 px-[28px]'> */}
                                    <div className="flex flex-wrap w-full">
                                        {dataSinger?.sections[0]?.items?.filter((item,index)=>index<6)?.map((item)=>(
                                            <div key={item?.encodeId} className="w-[90%] min-[1024px]:w-[50%]">
                                                <SongItem 
                                                    thumbnail={item.thumbnail}
                                                    artistsNames={item.artistsNames}
                                                    encodeId={item.encodeId}
                                                    title={item.title} 
                                                    // releaseDate={item.releaseDate}
                                                    isPrivate={item.isPrivate}
                                                    sm
                                                    style='text-black hover:bg-main-200 border-b border-gray-400 rounded-none px-1'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                        {dataSinger?.sections.filter((item)=>item.sectionType === 'playlist').map((item)=><Section key={item.title} data={item} flexStart/>)}
                        <div className="flex flex-col w-full px-[60px] mt-[30px]">
                            <h3 className="text-lg font-bold mb-5">{dataSinger?.sections?.find(item => item.sectionType === 'artist')?.title}</h3>
                            <div className="flex gap-[20px]">
                                {dataSinger?.sections?.find(item => item.sectionType === 'artist')?.items?.filter((item,index)=>index<5).map((item) =>(
                                    // <div key={item.encodeId} className={`flex-auto ${index%2?'pl-2':'pr-2'}`}>
                                        <Artist 
                                            key={item.id}
                                            image={item.thumbnailM}
                                            title={item.name}
                                            follower={item.totalFollow}
                                            link={item.link}
                                        />
                                    // </div>
                                ))}
                            </div>
                        </div>
                        <div className='px-[60px] mt-[48px]'>
                            <h3 className="text-lg font-bold mb-5">{`Về ${dataSinger?.name}`}</h3>
                            <div className='flex gap-5 '>
                                <img src={dataSinger?.cover} alt="thumbnailM" className='w-[45%] h-[400px] flex-none object-cover rounded-md' />
                                <div className='flex flex-col gap-5 text-sm opacity-80'>
                                    <p dangerouslySetInnerHTML={{ __html : dataSinger?.biography}}></p>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-[20px] font-bold'>{Number(dataSinger?.follow?.toFixed(1)).toLocaleString()}</span>
                                        <span>Người quan tâm</span>
                                    </div>
                                </div>
                            </div>
                        </div></>):<div className='flex h-[60%] items-center justify-center mt-10 text-[28px] font-semibold'>Không có dữ liệu hiển thị</div>}
                        {/* <div className='w-full h-[70px]'></div> */}
                    </>
            }
        </div>
    )
}

export default Singer;
