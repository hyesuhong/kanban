import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
	background: ${(props) => (props.isDragging ? '#DCF0F7' : props.theme.cardColor)};
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 5px;
	box-shadow: ${(props) => (props.isDragging ? '3px 3px 5px rgba(0,0,0,0.2)' : 'none')};
`;

interface ICardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

function DraggableCard({ toDoId, toDoText, index }: ICardProps) {
	return (
		<Draggable draggableId={toDoId + ''} index={index}>
			{(provided, snapshot) => (
				<Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DraggableCard);
