/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";

const Home = () => {
	const { searchTerm } = useOutletContext(); 
	
	const [columns, setColumns] = useState<Columns>(() => {
		const savedBoard = localStorage.getItem("kanbanBoard");
		return savedBoard ? JSON.parse(savedBoard) : Board;
	});
	
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState("");

	useEffect(() => {
		localStorage.setItem("kanbanBoard", JSON.stringify(columns));
	}, [columns]);

	const openModal = (columnId: any) => {
		setSelectedColumn(columnId);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleAddTask = (taskData: any) => {
		setColumns((prevColumns) => {
			const newColumns = { ...prevColumns };
			newColumns[selectedColumn] = {
				...newColumns[selectedColumn],
				items: [...newColumns[selectedColumn].items, taskData],
			};
			return newColumns;
		});
	};

	const handleDeleteTask = (columnId: string, taskId: string) => {
		setColumns((prevColumns) => {
			const newColumns = { ...prevColumns };
			newColumns[columnId] = {
				...newColumns[columnId],
				items: newColumns[columnId].items.filter((task) => task.id !== taskId),
			};
			return newColumns;
		});
	};

	const filteredTasks = (tasks: any[]) => {
		if (!searchTerm?.trim()) return tasks;
		return tasks.filter(task => 
			task.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	return (
		<>
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
				<div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
					{Object.entries(columns).map(([columnId, column]: any) => (
						<div
							className="w-full flex flex-col gap-0"
							key={columnId}
						>
							<Droppable
								droppableId={columnId}
								key={columnId}
							>
								{(provided: any) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
									>
										<div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
											{column.name} ({filteredTasks(column.items).length})
										</div>
										{filteredTasks(column.items).map((task: any, index: any) => (
											<Draggable
												key={task.id.toString()}
												draggableId={task.id.toString()}
												index={index}
											>
												{(provided: any) => (
													<div className="relative w-full">
														<Task
															provided={provided}
															task={task}
														/>
														<button
															onClick={() => handleDeleteTask(columnId, task.id)}
															className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-sm font-bold"
															title="Удалить задачу"
														>
															×
														</button>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<div
								onClick={() => openModal(columnId)}
								className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
							>
								<AddOutline color={"#e483a0"} />
								Add Task
							</div>
						</div>
					))}
				</div>
			</DragDropContext>

			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleAddTask}
			/>
		</>
	);
};

export default Home;