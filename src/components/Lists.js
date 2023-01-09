import moment from "moment";
import { memo } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

import { List } from "../components";
import icons from "../ultis/icon";

const { BsDot } = icons;

const Lists = ({ totalDuration }) => {
	const {playlist} = useSelector(state=>state.music);
	// console.log(playlist);

	// console.log({ totalDuration });
	return (
		// <Scrollbars style={{ width: "100%", height: "100%" }}>
		<div className="flex flex-col w-full h-full text-gray-600 text-[14px] ">
			<div className="flex justify-between items-center p-[10px] font-semibold">
				<span>BÀI HÁT</span>
				<span className='hidden min-[770px]:flex'>ALBUM</span>
				<span>THỜI GIAN</span>
			</div>
			<Scrollbars autoHide style={{ width: "100%", height: "75%" }}>
				<div className="flex flex-col">
					{playlist?.map((song) => {
						return <List songData={song} key={song?.encodeId} />;
					})}
				</div>
			</Scrollbars>
			<span className="flex items-center gap-1 p-[10px] border-t border-[rgba(0,0,0,0.05)]">
				<span>{`${playlist?.length} bài hát`}</span>
				<BsDot size={24}/>
				<span>
					{moment.utc(totalDuration * 1000).format(`HH:mm:ss`)}
				</span>
			</span>
		</div>
		// </Scrollbars>
	);
};

export default memo(Lists);
