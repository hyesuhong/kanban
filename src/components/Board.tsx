import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import DraggableCard from './DraggableCard';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	background: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Title = styled.h2`
	text-align: center;
	padding: 10px 0;
	font-weight: 700;
`;

const Form = styled.form`
	width: 100%;
	padding: 0 10px;
	input {
		width: 100%;
	}
`;

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
	flex: 1;
	padding: 10px;
	background-color: ${(props) => (props.isDraggingOver ? '#EBEEFA' : props.isDraggingFromThis ? '#C0BFD6' : 'transparent')};
	transition: background 0.3s;
`;

interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
}

interface IForm {
	toDo: string;
}

/*
ref(reference)
- react 코드를 이용해 html 요소를 지정하고 가져올 수 있는 방법
- ref.current 를 통애 html 요소에 접근 및 변형할 수 있음
*/
function Board({ toDos, boardId }: IBoardProps) {
	const setToDo = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};
		setToDo((curToDo) => {
			return {
				...curToDo,
				[boardId]: [...curToDo[boardId], newToDo],
			};
		});
		setValue('toDo', '');
	};
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input {...register('toDo', { required: true })} type='text' placeholder={`Add task on ${boardId}`} />
			</Form>
			<Droppable droppableId={boardId}>
				{(provided, snapshot) => (
					<Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
						{toDos.map((todo, index) => (
							<DraggableCard key={todo.id} toDoId={todo.id} toDoText={todo.text} index={index} />
						))}
						{provided.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
}

export default Board;
