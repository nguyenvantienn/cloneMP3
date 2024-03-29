import { memo } from "react";
import moment from "moment";
import { useDispatch , useSelector } from "react-redux";

import icons from "../ultis/icon";
import * as actions from "../store/actions";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData , hiden ,hidenTitle , order, numberCut}) => {

	const dispatch = useDispatch();
	// const {currentWidth} = useSelector(state => state.app);
	// console.log(songData);
	const cutTitle = numberCut || 25;
	return (
		<div
			className="w-full flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
			onClick={() => {
				dispatch(actions.setCurSongId(songData?.encodeId));
				dispatch(actions.play(true))
				dispatch(actions.playAlbum(true))
				dispatch(actions.setRecent({thumbnail:songData?.thumbnail,artistsNames:songData?.artistsNames,title:songData?.title,encodeId:songData?.encodeId}))
			}}
		>
			<div className={`flex gap-1 items-center ${hidenTitle?'flex-auto max-w-[70%]':'flex-1 max-w-[35%]'}`}>
				{order && <span
					className={`${order ===1?'text-shadow-no1':order===2?'text-shadow-no2':order===3?'text-shadow-no3':'text-shadow-rest'}
					text-[rgba(77,34,104,0.9)] text-main-300 text-[32px] flex items-center justify-center flex-none w-[40px] `}
				>{order}</span>}
				{hiden?'':<BsMusicNoteBeamed />}
				<img
					src={songData?.thumbnail}
					alt="img"
					className="w-10 h-10 flex-none object-cover rounded-md"
				/>
				<div className="max-w-[70%] flex flex-auto flex-col items-start text-gray-500 pl-1">
					<span className="w-full text-sm font-semibold truncate">
						{/* {songData?.title.length > cutTitle
							? `${songData?.title.slice(0, cutTitle)}...`
							: songData?.title} */}
							{songData?.title}
					</span>
					<span className="w-full text-[12px] opacity-70 truncate">
						{songData?.artistsNames}
						{/* {songData?.artistsNames.length > cutTitle
							? `${songData?.artistsNames.slice(0, cutTitle)}...`
							: songData?.artistsNames} */}
							
					</span>
				</div>
			</div>
			{hidenTitle?'':
			<div className={`flex-1 hidden min-[770px]:flex items-center justify-center text-sm whitespace-nowrap`}>
				{songData?.album?.title.length > 25
					? `${songData?.album?.title.slice(0, 25)}...`
					: songData?.album?.title}
					{/* {songData?.album?.title} */}
			</div>
			}		
			<div className="flex-1 flex items-center justify-end pr-1 text-xs opacity-70">
				{moment.utc(songData?.duration * 1000).format("mm:ss")}
			</div>
		</div>
	);
};

export default memo(List);
