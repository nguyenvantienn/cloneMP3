
import {useEffect, useState ,useRef} from 'react'
import { Line } from "react-chartjs-2"
import { Chart } from "chart.js/auto"


import * as apis from '../../apis'
import bgChart from '../../assets/bg-chart.jpg'
import { isEqual } from "lodash"
import { List, LoadingSong ,SongItem ,RankWeek} from '../../components';

const ZingChart = () =>{
    const [isLoad,setIsLoad] = useState(false);
    const [chartData,setChartData] = useState();
    const [data,setData] = useState();
    // const [showAll , setShowAll] = useState(false)

    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [selected,setSelected] = useState(null);
    const chartRef = useRef();
    const options ={
        responsive :true,
        pointRadius:0,
        maintainAspectRatio : false,
        scales: {
            y: {
                ticks :{display :false},
                grid : {color: 'rgba(0,0,0,0.3)' , drawTicks :false},
                min  : chartData?.RTChart?.chart?.minScore,
                max : chartData?.RTChart?.chart?.maxScore,
                border : { dash : [3,4] }
            },
            x: {
                ticks: {color :'gray'},
                grid: {color: 'transparent'}
            }
        },
        plugins : {
            legend: false,
            tooltip: {
                enabled :false,
                external : (ctx) =>{
                    if(!chartRef || !chartRef.current) return;
                    const {tooltip} = ctx;
                    // console.log(tooltip);
                    if(tooltip.opacity === 0){
                        if(tooltipState.opacity !== 0) setTooltipState(prev =>({...prev,opacity:0 }))
                        return
                    }
                    const counters = [];
                    for(let i=0;i<3;i++){
                        counters.push({
                            data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter((item)=> +item.hour%2===0)?.map((item)=>item.counter),
                            encodeId :Object.keys(chartData?.RTChart?.chart?.items)[i]
                        })
                    }
                    // console.log(counters);
                    let check = +tooltip.body[0]?.lines[0]?.replace('.','');
                    // console.log(check);
                    const rs = counters?.find(i=>i.data.some(n =>{return n === check}));
                    // console.log(rs);
                    setSelected(rs.encodeId)
                    const newTooltipData = {
                        opacity :1,
                        top :tooltip.caretY,
                        left: tooltip.caretX,
                    }
                    if(!isEqual(tooltipState,newTooltipData)) setTooltipState(newTooltipData)
                    
                }
                
            }
        },
        hover: { 
            mode :'dataset',
            intersect: false
        }
    }

    useEffect(()=>{
        const fetchDataHomeChart = async()=>{
            setIsLoad(false);
            const response = await apis.apiGetChartHome();
            // console.log(response);
            if(response?.data.err === 0){
                setChartData(response?.data?.data);
                setIsLoad(true);
            }
        }
        fetchDataHomeChart()
    },[])

    //Cover Object to Array
    // console.log(Object.entries(chartData?.weekChart));

    useEffect(()=>{
        const labels = chartData?.RTChart?.chart?.times?.filter((item)=> +item.hour%2===0)?.map((item)=>`${item.hour}:00`)
        const datasets = [];
        if(chartData?.RTChart?.chart?.items){
            for(let i=0 ; i<3 ;i++){
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter((item)=> +item.hour%2===0)?.map((item)=>item.counter),
                    borderColor: i===0 ? '#4a90e2' : i===1 ? '#50e3c2' :'#e35050',
                    tension : 0.2,
                    borderWidth: 2,
                    pointBackgroundColor :'white',
                    pointHoverRadius: 4,
                    pointBorderColor : i===0 ? '#4a90e2' : i===1 ? '#50e3c2' :'#e35050',
                    pointHoverBorderWidth: 4         
                })
            }
            setData({ labels , datasets });
        }
    },[chartData])

    const itemSelected = chartData?.RTChart?.items?.find(item=>item.encodeId === selected)
    // console.log(data);
    return(
        <div className='w-full'>
            {!isLoad ? <div className='flex justify-center mt-20'><LoadingSong width='48px'/></div>:
                <div className='flex flex-col w-full'>
                    <div className='relative w-full'>
                        <img src={bgChart} alt="background-Chart" className='w-[98%] mx-auto h-[500px] object-cover grayscale'/>
                        <div className='absolute top-0 right-0 bottom-0 left-0 bg-[rgba(206,217,217,0.8)]'></div>
                        <div className='absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div>
                        <div className='absolute top-0 right-0 bottom-2/3 left-0 px-[60px]'>
                            <h3 className='mt-12 font-bold text-[40px] text-main-500'>#ZingChart</h3>
                        </div>
                        <div className='absolute top-1/3 right-0 bottom-0 left-0 px-[60px]'>
                            {data&&<Line ref={chartRef} data={data} options={options}/>}
                            <div className="tooltip" style={{top: tooltipState.top,left: tooltipState.left,opacity: tooltipState.opacity, position:'absolute'}}>
                                <SongItem
                                    thumbnail ={itemSelected?.thumbnail}
                                    artistsNames = {itemSelected?.artistsNames}
                                    encodeId ={itemSelected?.encodeId}
                                    title ={itemSelected?.title}
                                    style='bg-white text-black'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='px-[60px] mt-12'>
                        <RankWeek data={chartData?.RTChart?.items} hidenTitle={false}/>
                    </div>
                    <div className='relative mt-12 w-full'>
                        <img src={bgChart} alt="background-Chart" className='w-[98%] mx-auto h-[1600px] min-[1200px]:h-[650px] object-cover grayscale'/>
                        <div className='absolute top-0 right-0 bottom-0 left-0 bg-[rgba(206,217,217,0.8)]'></div>
                        {/* <div className='absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div> */}
                        <div className='w-full absolute flex flex-col top-0 right-0 bottom-2/3 left-0 px-[60px]'>
                            <h3 className='mt-8 mb-[16px] font-bold text-[34px] text-main-500'>Bảng Xếp Hạng Tuần</h3>
                            <div className='flex flex-col w-full min-[1200px]:flex-row gap-[8px] justify-between'>
                                {chartData?.weekChart && Object.entries(chartData?.weekChart).map((item,index)=>(
                                    <div key={item[1].country} className='flex-1  min-[1200px]:max-w-[33%] px-[10px] py-5 bg-[rgba(206,217,217,0.5)] border border-black rounded-md'>
                                        <h3 className='text-[24px] text-main-500 font-semibold px-[20px]'>
                                            {item[0] ==='vn'?'Việt Nam':item[0]==='us'?'US-UK':item[0]==='korea'?'K-POP':item[0]}
                                        </h3>
                                        <RankWeek data={item[1].items.filter((item,index)=>index<5)} hidenTitle={true} numberCut={15} subLink ={item[1].link}/>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            }
            
        </div>
    )
}
export default ZingChart;