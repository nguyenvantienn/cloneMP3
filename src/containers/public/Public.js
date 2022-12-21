import { Outlet } from "react-router-dom";
import {useState} from 'react'
import { Scrollbars } from "react-custom-scrollbars-2";


import { Player } from "../../components";

import { SidebarLeft, SidebarRight,Header } from "../../components";
const Public = () => {
	const [showSidebarRight,setShowSidebarRight] = useState(true);
	// console.log(showSidebarRight)
	return (
		<div className="w-full h-screen relative flex flex-col bg-main-300">
			<div className="w-full h-full flex flex-auto">
				<div className="min-[1130px]:w-[240px] w-[70px] h-full flex-none">
					<SidebarLeft />
				</div>
				<div className="flex-auto flex flex-col">
					<div className="h-[70px] px-[59px] flex flex-none items-center">
						<Header />
					</div>
					<div className="flex flex-auto w-full">
						<Scrollbars autoHide style={{ width: "100%", height: "85%" }}>
							<Outlet />
							<div className="w-full h-[30px]"></div>
						</Scrollbars>
					</div>
				</div>
				{	showSidebarRight && 
					<div className="w-[329px] h-screen flex-none hidden 1600:flex animate-slide-left bg-[#DDE4E]">
						<SidebarRight />
					</div> 
				}
			</div>
			<div className="fixed z-50 bottom-0 right-0 left-0 h-[90px]">
				<Player setShowSidebarRight={setShowSidebarRight}/>
			</div>
		</div>
	);
};

export default Public;
