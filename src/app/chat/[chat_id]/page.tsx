'use client';

import { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';

export default function Page() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({});

	const endRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (endRef?.current) {
			endRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	return (
		<div className='flex  flex-col justify-between items-center h-screen'>
			<div className='flex flex-col justify-between w-2/3 gap-8 overflow-y-auto flex-1'>
				<div className='h-4'></div>
				<div className='flex flex-col gap-8 flex-1'>
					{messages?.map((message) => (
						<div key={message.id} className={`rounded-lg flex flex-row  ${message?.role === 'assistant' ? 'justify-start mr-18' : 'justify-end ml-10'}`}>
							<p className={`inline-block p-2 rounded-lg ${message?.role === 'assistant' ? 'bg-blue-300' : 'bg-slate-100'}`}>{message?.content}</p>
						</div>
					))}
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<input name='prompt' value={input} onChange={handleInputChange} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
