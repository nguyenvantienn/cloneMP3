import { memo,useState , useEffect, useRef } from "react"
import { Line } from "react-chartjs-2"
import { Chart } from "chart.js/auto"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {SongItem} from "./"
import bgChart from '../assets/bg-chart.jpg'
import { isEqual } from "lodash"
import path from '../ultis/path'
import icons from '../ultis/icon'

const {BsFillPlayFill} =icons

const ChartSection = () =>{
    const [data,setData] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [selected,setSelected] = useState(null);

    const { chart, rank } = useSelector(state=>state.app);
    const chartRef = useRef();

    const options ={
        responsive :true,
        pointRadius:0,
        maintainAspectRatio : false,
        scales: {
            y: {
                ticks :{display :false},
                grid : {color: 'rgba(255,255,255,0.1)' , drawTicks :false},
                min  : chart?.minScore,
                max : chart?.maxScore,
                border : { dash : [3,4] }
            },
            x: {
                ticks: {color :'white'},
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
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter((item)=> +item.hour%2===0)?.map((item)=>item.counter),
                            encodeId :Object.keys(chart?.items)[i]
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
    // console.log({chart , rank});
    // console.log(tooltipState);
    // console.log(selected);

    useEffect(()=>{
        const labels = chart?.times?.filter((item)=> +item.hour%2===0)?.map((item)=>`${item.hour}:00`)
        const datasets = [];
        if(chart?.items){
            for(let i=0 ; i<3 ;i++){
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter((item)=> +item.hour%2===0)?.map((item)=>item.counter),
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
    },[chart])
    const itemSelected = rank?.find(item=>item.encodeId === selected)
    // console.log(itemSelected);
    return(
        <div className="px-[59px] mt-12 relative h-[760px] min-[1324px]:max-h-[430px] rounded-md">
            <img src={bgChart} alt="bg-chart" className="w-full rounded-md object-cover min-[1324px]:max-h-[430px] h-[760px]" />
            <div className="absolute z-10 top-0 right-[59px] bottom-0 left-[59px] bg-[rgba(77,34,104,0.9)] rounded-md"></div>
            <div className="px-2 py-3 absolute z-20 top-0 right-[59px] bottom-0 left-[59px] flex flex-col gap-8">
                <Link to={path.ZING_CHART} className='flex gap-1 items-center text-white hover:text-green-700'>
                    <h3 className="text-2xl font-bold">#ZingChart</h3>
                    <span className="text-green p-1 border border-gray-700 rounded-full cursor-pointer bg-white"><BsFillPlayFill size={24} color='green'/></span>
                </Link>
                <div className="h-full flex min-[1324px]:flex-row flex-col  gap-0 text-white items-center">
                    <div className="flex-3 flex flex-col gap-3 w-full">
                        {rank?.filter((item,index)=>index<3)?.map((item,i)=>(
                            <SongItem 
                                key={item.encodeId}
                                thumbnail ={item.thumbnail}
                                artistsNames = {item.artistsNames}
                                encodeId ={item.encodeId}
                                title ={item.title}
                                order ={i+1}
                                percent ={Math.round(item.score*100 / chart?.totalScore)}
                                style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]'
                            />
                        ))}
                        <Link to={path.ZING_CHART} className='text-white w-fit px-4 py-2 mx-auto rounded-l-full rounded-r-full border border-white'>Xem Thêm</Link>
                    </div>
                    <div className="flex-7 w-full h-full order-first min-[1324px]:order-last min-[1324px]:min-w-[300px] relative">
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
            </div> 
        </div>
    )
}

export default memo(ChartSection)