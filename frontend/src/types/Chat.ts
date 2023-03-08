export interface IChannel {
  id: number;
  name: string;
  removable: boolean;
}

export type ICurrentChannelId = IChannel['id'];
export type IChannels = IChannel[];

export interface IMessage {
  id: number;
  text: string;
  channelId: IChannel['id'];
}

export type IMessages = IMessage[];

export interface IServerChatsResponse {
  data: {
    channels: IChannels;
    currentChannelId: ICurrentChannelId;
    messages: IMessages;
  };
}
