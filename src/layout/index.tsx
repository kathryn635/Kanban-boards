import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Layout = () => {
	const [searchTerm, setSearchTerm] = useState("");
	
	return (
		<div className="w-screen h-screen relative">
			<Sidebar />
			<Navbar 
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
				<Outlet context={{ searchTerm }} />
			</div>
		</div>
	);
};

export default Layout;