import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import DraggableCard from './components/DraggableCard';

const Wrapper = styled.div`
	display: flex;
	max-width: 480px;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
`;

const Boards = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	width: 100%;
`;

const Board = styled.div`
	background: ${(props) => props.theme.boardColor};
	padding: 30px 10px 10px;
	border-radius: 5px;
	min-height: 200px;
`;

function App() {
	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		if (!destination) return;
		setToDos((current) => {
			let curVal = [...current];
			// 1. delete item on source.index
			curVal.splice(source.index, 1);
			// 2. put back the item on destination.index
			curVal.splice(destination?.index, 0, draggableId);
			return curVal;
		});
	};
	const [toDos, setToDos] = useRecoilState(toDoState);
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId='one'>
						{(provided) => (
							<Board ref={provided.innerRef} {...provided.droppableProps}>
								{toDos.map((todo, index) => (
									<DraggableCard key={todo} toDo={todo} index={index} />
								))}
								{provided.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
