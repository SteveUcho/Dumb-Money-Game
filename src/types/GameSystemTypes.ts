interface WsData {
  type: string;
  messageId: string;
  playerId: string;
  username: string;
}

export interface ChatMessage extends WsData {
  type: "chat";
  data: {
    message: string;
  };
}

export interface SystemMessage extends WsData {
  type: "system";
  data: {
    action: string;
    playerId: string;
    username: string;
  };
}

export type WsMessage = ChatMessage | SystemMessage;
