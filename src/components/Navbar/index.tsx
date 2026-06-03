import {
	ChevronDown,
	NotificationsOutline,
	PersonCircle,
	SearchOutline,
	SettingsOutline,
	ShareSocialOutline,
} from "react-ionicons";

const Navbar = ({ searchTerm, setSearchTerm }: any) => {
	return (
		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
			<div className="flex items-center gap-3 cursor-pointer">
				<PersonCircle
					color="#e78bcc"
					width={"28px"}
					height={"28px"}
				/>
				<span className="text-pink-400 font-semibold md:text-lg text-sm whitespace-nowrap">
					Board Name
				</span>
				<ChevronDown
					color="#e07acf"
					width={"16px"}
					height={"16px"}
				/>
			</div>
			<div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
				<SearchOutline color={"#e08bd9"} />
				<input
					type="text"
					placeholder="Поиск задач..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full bg-gray-100 outline-none text-[15px]"
				/>
			</div>
			<div className="md:flex hidden items-center gap-4">
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
					<ShareSocialOutline color={"#d88acb"} />
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
					<SettingsOutline color={"#ce71be"} />
				</div>
				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
					<NotificationsOutline color={"#d179bb"} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;	