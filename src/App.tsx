import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minuteState } from './atoms';

function App() {
	const [minutes, setMinutes] = useRecoilState(minuteState);
	const [hours, setHours] = useRecoilState(hourSelector);
	const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+event.currentTarget.value);
	};
	const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHours(+event.currentTarget.value);
	};
	return (
		<div>
			<input type='number' placeholder='Minutes' value={minutes} onChange={onMinutesChange} />
			<input type='number' placeholder='Hours' value={hours} onChange={onHoursChange} />
		</div>
	);
}

export default App;
