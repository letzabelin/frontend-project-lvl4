export interface IChannel {
  id: number,
  name: string,
  removable: boolean,
}

export type ICurrentChannelId = number;

export interface IMessage {
  id: number,
  text: string,
  channelId: IChannel['id'],
  username: string,
}

export interface IServerChatsResponse {
  channels: IChannel[],
  currentChannelId: ICurrentChannelId,
  messages: IMessage[],
}

export enum IChatEvent {
  NewMessage = 'newMessage',
  NewChannel = 'newChannel',
  RemoveChannel = 'removeChannel',
  RenameChannel = 'renameChannel',
}
