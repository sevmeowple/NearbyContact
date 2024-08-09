function getUsernameFromReq(req: Request): string {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    if (!username) {
        throw new Error("Username is required");
    }
    return username;
}

import { v4 } from 'uuid';

enum MessageType {
    Info = 'info',
    Message = 'message',
}

interface ChatMessage {
    type: string;
    data: {
        username: string;
        message: string;
        uuid?: string;
        timestamp?: string;
    }
}

const server = Bun.serve<{
    uuid: string | undefined; username: string
}>({
    fetch(req, server) {
        const url = new URL(req.url);
        if (url.pathname === "/chat") {
            const username = getUsernameFromReq(req);
            console.log(`${username} has upgrade!`);
            const uuid = v4();
            const success = server.upgrade(req, { data: { username, uuid } });
            return success
                ? undefined
                : new Response("WebSocket upgrade error", { status: 400 });
        }

        return new Response("Hello world");
    },
    websocket: {
        open(ws) {
            const msg: ChatMessage = { type: MessageType.Info, data: { username: ws.data.username, message: `${ws.data.username} has entered the chat`, uuid: ws.data.uuid, timestamp: new Date().toISOString() } };
            ws.subscribe("the-group-chat");
            server.publish("the-group-chat", JSON.stringify(msg));
        },
        message(ws, message) {
            try {
                const messageStr = typeof message === 'string' ? message : message.toString();
                const msgJ: ChatMessage = JSON.parse(messageStr);
                // console.log(`Server:messagefunc: ${message}`);
                // this is a group chat
                // so the server re-broadcasts incoming message to everyone
                const msg: ChatMessage = { type: MessageType.Message, data: { username: msgJ.data.username, message: msgJ.data.message, uuid: ws.data.uuid, timestamp: new Date().toISOString() } }
                server.publish("the-group-chat", JSON.stringify(msg));
            } catch (error) {
                console.error('Failed to parse message:', error);
                ws.close(1003, 'Invalid message format'); // 1003: Unsupported Data
            }
        },
        close(ws) {
            // const msg = `${ws.data.username} has left the chat`;
            const msg: ChatMessage = { type: MessageType.Info, data: { username: ws.data.username, message: `${ws.data.username} has left the chat`, uuid: ws.data.uuid, timestamp: new Date().toISOString() } };
            ws.unsubscribe("the-group-chat");
            server.publish("the-group-chat", JSON.stringify(msg));
        },
    },
    port: 3030,
    hostname: '0.0.0.0'
});

console.log(`Listening on ${server.hostname}:${server.port}`);