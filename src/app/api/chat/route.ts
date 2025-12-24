import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { auth } from '@clerk/nextjs/server';
import { createMessages } from '@/db';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const deepseek = createDeepSeek({
	apiKey: process.env.DEEPSEEK_API_KEY,
	baseURL: process.env.BASE_URL,
});
export async function POST(req: Request) {
	const { messages, model, chat_id, chat_user_id } = await req.json();

	const { userId } = await auth();
	if (!userId || userId !== chat_user_id) {
		return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
	}
	// 存入用户最后一条消息
	const lastMessage = messages[messages.length - 1];
	await createMessages(chat_id, lastMessage.role, lastMessage.content);

	const result = streamText({
		model: deepseek('deepseek-v3'),
		system: 'You are a helpful assistant.',
		messages: convertToModelMessages(messages),
		onFinish: async (result) => {
			// 存入AI回复
			await createMessages(chat_id, result.text, 'assistant');
		},
	});

	return result.toUIMessageStreamResponse();
}
