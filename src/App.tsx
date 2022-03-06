import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './components/Board';
import DraggableCard from './components/DraggableCard';

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	padding: 20px;
	justify-content: center;
	align-items: center;
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	gap: 10px;
`;

function App() {
	const onDragEnd = (info: DropResult) => {
		// console.log(info);
		const { destination, draggableId, source } = info;
		if (!destination) return;
		if (destination?.droppableId === source.droppableId) {
			// same board
			setToDos((allBoards) => {
				const copy = [...allBoards[source.droppableId]];
				copy.splice(source.index, 1);
				copy.splice(destination.index, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: copy,
				};
			});
		} else {
			// defferent board
			setToDos((allBoards) => {
				const startCopy = [...allBoards[source.droppableId]];
				const destCopy = [...allBoards[destination.droppableId]];
				startCopy.splice(source.index, 1);
				destCopy.splice(destination.index, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: startCopy,
					[destination.droppableId]: destCopy,
				};
			});
		}
	};
	const [toDos, setToDos] = useRecoilState(toDoState);
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
