export interface WsMessage {
  type: string;
  messageId: string;
  playerId: string;
  username: string;
  data: Record<string, any>;
}
