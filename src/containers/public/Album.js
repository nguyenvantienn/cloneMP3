import { useState, useEffect } from "react";
import { useParams ,useLocation} from "react-router-dom";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { Lists, AudioLoading, LoadingSong } from "../../components";
import * as apis from "../../apis";
import icons from "../../ultis/icon";

const { BsDot, BsFillPlayFill } = icons;

const Album = () => {
	const [playlistData, setPlaylistData] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const { title, pid } = useParams();
	const dispatch = useDispatch();
	const location = useLocation()

	// console.log(location);
	const { curSongId, isPlaying, playlist } = useSelector((state) => state.music,);

	// console.log({title,pid});
	useEffect(() => {
		dispatch(actions.setCurAlbumId(pid));
		const fetchDetailPlaylist = async () => {
			setIsLoaded(false);
			const response = await apis.apiGetDetaiPlaylist(pid);
			// console.log(response);
			setIsLoaded(true);
			if (response?.data?.err === 0) {
				setPlaylistData(response.data?.data);
				dispatch(actions.setPlaylist(response.data?.data?.song?.items));
			}
		};
		fetchDetailPlaylist();
	}, [pid]);

	useEffect(() => {
		if(location.state?.playAlbum){
			// console.log(playlistData?.song?.items);
			const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length )-1;
			// console.log(playlistData?.song?.items[randomSong]?.encodeId);
			if(playlistData?.song?.items[randomSong]?.encodeId){
				dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId));
				dispatch(actions.play(true));
			}
		}
	},[pid, playlistData])

	return (
		<>
			{!isLoaded ? (
				<div className="flex h-[60%] items-center justify-center">
					<LoadingSong width={46}/>
				</div>
			) : (
				<div className="mt-6 flex max-[1200px]:flex-col w-full h-[100%] px-[59px]">
					<div className="flex-none w-full min-[1200px]:w-1/4 h-[200px] min-[1200px]:h-full pr-6 flex min-[1200px]:flex-col  min-[1200px]:items-center gap-2">
						<div className="relative">
							<img
								src={playlistData?.thumbnailM}
								alt="thumbnail"
								className={`w-full max-[1200px]:w-[200px] max-[1200px]:h-[200px] object-cover ${
									isPlaying
										? "rounded-full animate-rotate-center"
										: "rounded:md animate-rotate-center-pause"
								} shadow-sm`}
							/>
							<div
								className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 ${
									isPlaying ? "hover: rounded-full" : ""
								} text-white flex items-center justify-center`}
							>
								<span className="p-3 rounded-full">
									{isPlaying ? (
										<AudioLoading />
									) : (
										<BsFillPlayFill size={24} />
									)}
								</span>
							</div>
						</div>
						<div className="flex flex-col min-[1200px]:items-center">
							<h3 className="text-[20px] font-bold text-gray-700">
								{playlistData?.title}
							</h3>
							<span className="text-gray-500">
								<span>Cập nhật : </span>
								<span>
									{moment
										.unix(playlistData?.contentLastUpdate)
										.format("DD/MM/YYYY")}
								</span>
							</span>
							<span className="flex flex-wrap items-center text-gray-500">
								{playlistData?.artistsNames}
							</span>
							<span className="text-gray-500">{`${Math.round(
								playlistData.like / 1000,
							)}K người yêu thích`}</span>
						</div>
					</div>
					<div className="flex-auto w-full h-full mb-10">
						<span className="text-[14px] p-[10px]">
							<span className="text-gray-600">Lời tựa </span>
							<span>{playlistData?.sortDescription}</span>
						</span>
						{/* <Scrollbars style={{ width: "100%", height: "75%" }}> */}
						<Lists
							// songs={playlistData?.song?.items}
							totalDuration={playlistData?.song?.totalDuration}
						/>
						{/* </Scrollbars> */}
					</div>
				</div>
			)}
		</>
	);
};

export default Album;
