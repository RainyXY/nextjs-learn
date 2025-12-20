import { getChat } from './index';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { chatsTable, messagesTable } from './schema';
import { eq, and } from 'drizzle-orm';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client });
// chats
export const createChat = async (title: string, userId: string, model: string) => {
	try {
		const [newChat] = await db.insert(chatsTable).values({ title, userId, model }).returning();
		return newChat;
	} catch (error) {
		console.error(error);
		return null;
	}
};
// messages
export const getChat = async (chatId: number, userId: string) => {
	try {
		const chat = await db
			.select()
			.from(chatsTable)
			.where(and(eq(chatsTable.id, chatId), eq(chatsTable.userId, userId)));
		if (chat.length === 0) {
			return null;
		}
		return chat[0];
	} catch (error) {
		console.error('error getting chat:', error);
		return null;
	}
};

export const getChats = async (userId: string) => {
	try {
		const chats = await db.select().from(chatsTable).where(eq(chatsTable.userId, userId)).orderBy(chatsTable.id);
		return chats;
	} catch (error) {
		console.error('error getting chats:', error);
		return null;
	}
};

// messages
export const createMessages = async (chat_id: number, role: string, content: string) => {
	try {
		const [newMessage] = await db.insert(messagesTable).values({ content: content, chatId: chat_id, role: role }).returning();
		return newMessage;
	} catch (error) {
		console.error('error creating message:', error);
		return null;
	}
};
export const getMessagesByChatId = async (chatId: number) => {
	try {
		const messages = await db.select().from(messagesTable).where(eq(messagesTable.chatId, chatId));
		return messages;
	} catch (error) {
		console.error('error getting messages:', error);
		return null;
	}
};
