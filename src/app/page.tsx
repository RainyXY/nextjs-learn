'use client'

import { useState } from "react";

export default function Home() {
	const [input, setInput] = useState("");
	const [model, setModel] = useState("deepseek-v3");
  return (
    <div className="h-screen flex  flex-col items-center">
      <div className="h-1/5"></div>
	   <div className="h-1/2">
		<p className="text-bold text-2xl text-center">有什么可以帮您的吗</p>

		<div className="flex flex-col  items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
		<textarea className="w-full  rounded-lg p-3 h-30 focus:outline-none" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
		<div className="flex flex-row items-center justify-center w-full h-12 mb-2">
			<select className="w-1/3 rounded-lg p-3 h-10 focus:outline-none" value={model} onChange={(e) => setModel(e.target.value)}>
				<option value="deepseek-v3">deepseek-v3</option>
				<option value="deepseek-v2">deepseek-v2</option>
			</select>
		</div>
	   </div>
    </div>
  );
}
