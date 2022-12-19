import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'

import { getArrSlider } from "../ultis/fn";
import * as actions from '../store/actions'
import icons from '../ultis/icon'

const {MdArrowBackIosNew,MdArrowForwardIos} = icons;
var intervalId;

const SliderBanner = ({banner}) => {
	// const { banner } = useSelector((state) => state.app);

	const [min,setMin] = useState(0)
	const [max,setMax] = useState(2)
	const [isAuto,setIsAuto] = useState(true)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	// console.log(banner);
	//Animation banner
	useEffect(() => {
		if(isAuto){
			intervalId = setInterval(() => {
				hadleAnimationBanner();
			}, 2000);
		}
		return () => {
			// console.log("clearn");
			intervalId && clearInterval(intervalId);
		};
	}, [min,max,isAuto]);


	const hadleAnimationBanner =(step=1) =>{
		const sliderElements = document.getElementsByClassName("slider-item");
		const list = getArrSlider(min, max, sliderElements.length - 1);
		// console.log({list ,max ,min});
			for (let i = 0; i < sliderElements.length; i++) {
				//Delete className
				sliderElements[i].classList?.remove('animate-slide-right','order-last','z-20')
				sliderElements[i].classList?.remove('animate-slide-left','order-first','z-10')
				sliderElements[i].classList?.remove('animate-slide-left1','order-2','z-10')
				//Hidden or Show banner
				if (list.some((item) => item === i)) {
					sliderElements[i].style.cssText = `display : block`;
				} else {
					sliderElements[i].style.cssText = `display : none`;
				}
			}
			//Add animation
			list.forEach(item =>{
				if(item === max) {
					sliderElements[item]?.classList?.add('animate-slide-right','order-last','z-20');
				}
				else if (item===min){
					sliderElements[item]?.classList?.add('animate-slide-left','order-first','z-10');
				}
				else{
					sliderElements[item]?.classList?.add('animate-slide-left1','order-2','z-10');
				}
			})

			if(step === 1 ){
				setMin(prev =>prev === sliderElements.length -1 ? 0 : prev+step)
				setMax(prev => prev === sliderElements.length -1 ? 0 : prev+step)
			}
			if(step === -1 ){
				setMin(prev =>prev === 0 ? sliderElements.length -1 : prev+step)
				setMax(prev => prev === 0 ? sliderElements.length -1 : prev+step)
			}
	}

	const hadlePrevBanner =useCallback(()=>{
		intervalId && clearInterval(intervalId);
		setIsAuto(false)
		hadleAnimationBanner(1);
	},[min,max])

	const handleNextBanner =useCallback(()=>{
		intervalId && clearInterval(intervalId);
		setIsAuto(false)
		hadleAnimationBanner(-1);
	},[min,max])


			
	//Truy cap vao Bannrer
	const handleClickBanner =(item) =>{
		if(item?.type ===1){
			dispatch(actions.setCurSongId(item.encodeId));
			dispatch(actions.play(true))
			dispatch(actions.setPlaylist(null));

		}else if(item?.type === 4){
			// console.log(item);
			const albumPath = item?.link?.split('.')[0];
			console.log(albumPath);
			// dispatch(actions.playAlbum(true));
			navigate(albumPath);
		}else{
			dispatch(actions.setPlaylist(null));

		}
	}
	// console.log(banner);
	return (
		<div className="w-full overflow-hidden px-[59px] relative"
			onMouseEnter={()=>{setIsAuto(false)}}
			onMouseLeave={()=>{setIsAuto(true)}}
		>
			{!isAuto && <button 
				className="absolute top-1/2 left-[59px] bg-[rgba(255,255,255,0.3)] p-2 rounded-full border border-black] text-white z-30"
				onClick={hadlePrevBanner}
			><MdArrowBackIosNew size={24}/></button>}
			<div className="flex gap-8 pt-8 w-full">
				{banner?.map((item,index) => {
					return (
						<img
							key={item.encodeId}
							src={item.banner}
							onClick={()=>{handleClickBanner(item)}}
							className={`slider-item flex-1 w-[30%] object-contain rounded-[8px] ${index <=2 ? 'block':'hidden'}`}
							alt=""
						/>
						
					);
				})}
			</div>
			{!isAuto &&<button
			className="absolute top-1/2 right-[59px] bg-[rgba(255,255,255,0.3)] p-2 rounded-full border border-black] text-white z-30"
			onClick={handleNextBanner}
			><MdArrowForwardIos size={24}/></button>}
		</div>
	);
};

export default SliderBanner;
