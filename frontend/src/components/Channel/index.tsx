import { forwardRef } from 'react';
import { Button, ButtonGroup, Dropdown, Nav } from 'react-bootstrap';
import cn from 'classnames';
import { useAppDispatch } from '@/hooks';
import { changeCurrentChannel } from '@/redux/slices/channels/channelsSlice';
import { openModal } from '@/redux/slices/modals/modalsSlice';
import { IModalTypes } from '@/types';

interface Props {
  id: number;
  title: string;
  active?: boolean;
  removable?: boolean;
}

const Channel = forwardRef<HTMLDivElement, Props>(({ title, active, removable, id }, ref) => {
  const variant = active ? 'primary' : 'outline-primary';
  const dispatch = useAppDispatch();

  const changeChannel = () => {
    dispatch(changeCurrentChannel({ id }));
  };

  const openRemoveChannelForm = () => {
    dispatch(openModal({ type: IModalTypes.RemoveChannel, extra: id }));
  };

  const openEditChannelNameForm = () => {
    dispatch(openModal({ type: IModalTypes.EditChannelName, extra: id }));
  };

  const activeClassesConfig = {
    'bg-transparent': !active,
    'text-primary': !active,
  };

  const buttonClasses = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'border-0', activeClassesConfig);
  const dropdownClasses = cn('border-0', activeClassesConfig);

  if (removable) {
    return (
      <Nav.Item ref={ref}>
        <Dropdown as={ButtonGroup} className="w-100 position-static" align="end">
          <Button className={buttonClasses} onClick={changeChannel}>
            <span className="me-1">#</span>
            {title}
          </Button>

          <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className={dropdownClasses} />

          <Dropdown.Menu id="dropdown-split-basic">
            <Dropdown.Item onClick={openEditChannelNameForm}>Переименовать</Dropdown.Item>
            <Dropdown.Item onClick={openRemoveChannelForm}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item ref={ref}>
      <Button variant={variant} className={buttonClasses} onClick={changeChannel}>
        <span className="me-1">#</span>
        {title}
      </Button>
    </Nav.Item>
  );
});

Channel.displayName = 'Channel';

export default Channel;
