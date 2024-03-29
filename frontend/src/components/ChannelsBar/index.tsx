import { useEffect, useRef } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Channel } from '@/components';
import { useAppDispatch } from '@/hooks';
import { openModal } from '@/redux/slices/modals/modalsSlice';
import { IModalTypes } from '@/types';
import type { IChannel, ICurrentChannelId } from '@/types';

interface Props {
  channels: IChannel[];
  currentChannelId?: ICurrentChannelId;
}

const ChannelsBar = ({ channels, currentChannelId }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const channelRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const openNewChannelForm = () => {
    dispatch(openModal({ type: IModalTypes.NewChannel }));
  };

  useEffect(() => {
    channelRef.current?.scrollIntoView();
  }, [currentChannelId]);

  const channelComponents = channels.map((channel: IChannel) => (
    <Channel
      key={channel.id}
      id={channel.id}
      title={channel.name}
      removable={channel.removable}
      active={channel.id === currentChannelId}
      ref={channel.id === currentChannelId ? channelRef : null}
    />
  ));

  return (
    <nav className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center p-4 ps-4 pe-2">
        <b>{t('chatPage.channels.title')}</b>

        <Button variant="outline-primary" className="d-flex text-primary border-0 bg-transparent p-0" onClick={openNewChannelForm}>
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
