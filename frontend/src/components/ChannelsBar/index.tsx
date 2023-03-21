import { Button, Nav } from 'react-bootstrap';
import { Channel } from '@/components';
import { IChannel, ICurrentChannelId } from '@/types/Chat';

interface Props {
  channels: IChannel[];
  currentChannelId?: ICurrentChannelId;
}

const ChannelsBar = ({ channels, currentChannelId }: Props): JSX.Element => {
  const channelComponents = channels.map((channel: IChannel) => (
    <Channel key={channel.id} title={channel.name} removable={channel.removable} active={channel.id === currentChannelId} />
  ));

  return (
    <nav className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center p-4 ps-4 pe-2">
        <b>Каналы</b>

        <Button variant="outline-primary" className="d-flex text-primary border-0 bg-transparent p-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Button>
      </div>

      <Nav as="ul" variant="pills" className="flex-column flex-nowrap p-2 overflow-auto d-block">
        {channelComponents}
      </Nav>
    </nav>
  );
};

export default ChannelsBar;
