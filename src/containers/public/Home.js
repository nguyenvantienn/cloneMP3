import { useEffect ,useMemo,useRef} from "react"
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Sliders from 'react-slick'


import { SliderBanner ,Section,NewRelease , ChartSection , Artist ,LoadingSong} from "../../components"



const Home =() =>{
    const {banner, hArtistTheme,sunday,newEveryday,top100,hAlbum,corner ,weekChart, favoritedArtist , artistSpotlight ,currentWidth} = useSelector(state =>state.app);
    // const Ref = useRef()
    const personal=useMemo(()=>{
        return currentWidth >1640?7:currentWidth>1300?6:5;
    },[currentWidth]) 
    //Setting Slider
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: personal,
        slidesToScroll: personal
    };
    // useEffect(()=>{
        // Ref.current && Ref.current.scrollIntoView({behavior : 'smooth', block:'start', inline:'nearest'})
    // },[])
    // console.log('reder');
    // console.log(!banner);
    return (
        <>
            { 
            // (banner && hArtistTheme && sunday && newEveryday && top100 || hAlbum || corner  || weekChart ) ?
            (banner && hArtistTheme && sunday && newEveryday && top100 && weekChart ) ?
                <div className="overflow-y-auto w-full" >
                    <SliderBanner banner={banner}/>
                    <Section data={hArtistTheme} hiden />
                    <NewRelease />
                    <Section data={sunday} hiden/>
                    <Section data={newEveryday} hiden/>
                    <Section data={top100} hiden/>
                    <ChartSection />
                    <div className="flex items-center px-[43px] w-full mt-12">
                        {weekChart?.map((item)=>(
                            <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1 px-4'>
                                <img src={item.cover} alt="img-Cover" className='w-full object-cover rounded-md' />
                            </Link>
                        ))}
                    </div>
                    {  artistSpotlight && <div className="px-[60px] w-full mt-12">
                        <Sliders {...settings}>
                            {artistSpotlight?.map(item=>(
                                <div key={item.id} className='px-[12px] '>
                                    <Artist
                                        image={item.thumbnail}
                                        title = {item.name}
                                        follower ={item.totalFollow}
                                        link={item.link}
                                        setwidth
                                    />
                                </div>
                            ))}
                        </Sliders>
                    </div>

                    }
                    <Section data={hAlbum} hiden/>
                    <Section data={corner} hiden/>
                    {favoritedArtist && (<div className="mt-12 w-full px-[59px] flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-bold">{favoritedArtist?.title}</h3>
                            <span className="text-xs">TẤT CẢ</span>
                        </div>  
                        <div className="flex items-start justify-between gap-[20px]">
                            {favoritedArtist?.items?.filter((item,index)=>index<5)?.map((item)=>(
                                <div key={item.encodeId} className="relative flex-1">
                                    <img src={item?.thumbnail} alt="Singner" className="w-full object-contain rounded-md" />
                                        <div className="absolute w-full bottom-[5%] flex flex-col">
                                            <span className="pl-[5%] mb-[12px] text-white font-semibold text-[24px]">{item?.artistsNames}</span>
                                            <div className="flex flex-evenly w-full justify-evenly">
                                                {item?.song?.items?.filter((item,index)=>index<3)?.map((item)=>(
                                                    <img key={item.encodeId} src={item?.thumbnail} alt="mini-Img" className="w-[25%] object-cover rounded-md" />
                                                ))}
                                            </div>
                                        </div>
                                    
                                </div>
                            ))}
                        </div>  
                    </div>)}
                    {/* Home */}
                    {/* <div className="w-full h-[500px]"></div> */}
                </div> : <div className="w-full h-[60%] flex flex-col justify-center items-center gap-2">
                        <h3 className="text-lg">Trang Web sẽ mất chút thời gian để khởi động...</h3>
                        <h2 className="text-2xl mb-2">Xin quý khách chờ trong giây lát . Xin lỗi quý khách về sự bất tiện này</h2>
                        <LoadingSong width={48}/>
                    </div>
            }
        </>
    )
}

export default Home