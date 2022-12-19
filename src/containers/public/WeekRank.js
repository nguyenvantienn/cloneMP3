
import { memo,useState ,useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import * as apis from '../../apis'
import { LoadingSong,RankWeek } from "../../components";
import bgWeekChart from '../../assets/week-chart-bg.jpg'

const activeStyle = 'text-[24px] hover:text-main-500 font-semibold cursor-pointer py-[10px] border-b-2 border-[#0E8080] text-main-500 flex items-center'
const notActiveStyle ='text-[24px] hover:text-main-500 font-semibold cursor-pointer py-[10px]'

const WeekRank = () =>{
    const [isLoad,setIsLoad] = useState(false);
    const [data,setData] = useState();


    const {title , pid} = useParams()

    useEffect(()=>{
        const fetchDataHomeChart = async()=>{
            setIsLoad(false);
            const response = await apis.apiGetChartHome();
            // console.log(response);
            console.log('callAPi');
            if(response?.data.err === 0){
                setData(Object.values(response?.data?.data?.weekChart));
                setIsLoad(true);
            }
        }
        fetchDataHomeChart()
    },[])

    // console.log(data);
    return (
        <>
            {!isLoad?
                <div className="w-full flex justify-center mt-20"><LoadingSong width='48px'/></div>:
                <div className="relative">
                    <img src={bgWeekChart} alt="background-Chart" className='w-[100%] mx-auto h-[500px] object-cover grayscale'/>
                    <div className='absolute top-0 right-0 bottom-0 left-0 bg-[rgba(206,217,217,0.8)]'></div>
                    <div className='absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div>
                    <div className='absolute top-0 right-0 bottom-2/3 left-0 px-[60px] flex flex-col gap-4'>
                        <h3 className='mt-10 font-bold text-[40px] text-main-500'>#Bảng Xếp Hạng Tuần</h3>
                        <div className="flex gap-8">
                            {data?.map((item) =>{
                                return (<NavLink to={item.link.split('.')[0]}
                                        key={item.country}
                                        className={({isActive})=>isActive?activeStyle : notActiveStyle}
                                    >
                                    {item.country ==='vn'?'VIỆT NAM':item.country==='us'?'US-UK':item.country ==='korea'?'K-POP':item.country}
                                </NavLink>)
                            })}
                        </div>
                        <div className='mt-12'>
                            <RankWeek data={data?.find(item=>item.link.includes(pid))?.items} hidenTitle={false}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default memo(WeekRank);