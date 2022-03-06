import { Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
	flex: 1%;
	background: ${(props) => props.theme.boardColor};
	padding: 10px;
	border-radius: 5px;
	min-height: 300px;
	& > div {
		min-height: calc(100% - 26px);
	}
`;

const Title = styled.h2`
	text-align: center;
	margin-bottom: 10px;
	font-weight: 700;
`;

interface IBoardProps {
	toDos: string[];
	boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{toDos.map((todo, index) => (
							<DraggableCard key={todo} toDo={todo} index={index} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Wrapper>
	);
}

export default Board;
