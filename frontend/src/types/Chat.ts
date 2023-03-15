export interface IChannel {
  id: number;
  name: string;
  removable: boolean;
}

export type ICurrentChannelId = number;
export type IChannels = IChannel[];

export interface IMessage {
  id: number;
  text: string;
  channelId: IChannel['id'];
}

export type IMessages = IMessage[];

export interface IServerChatsResponse {
  channels: IChannels;
  currentChannelId: ICurrentChannelId;
  messages: IMessages;
}
