import { Button, ButtonGroup, Dropdown, Nav } from 'react-bootstrap';
import cn from 'classnames';
import { useAppDispatch } from '@/hooks';
import { changeCurrentChannel } from '@/redux/slices/channels/channelsSlice';

interface Props {
  id: number;
  title: string;
  active?: boolean;
  removable?: boolean;
}

const ChannelButton = ({ title, active, removable, id }: Props): JSX.Element => {
  const variant = active ? 'primary' : 'outline-primary';
  const dispatch = useAppDispatch();

  const changeChannel = () => {
    dispatch(changeCurrentChannel(id));
  };

  const activeClassesConfig = {
    'bg-transparent': !active,
    'text-primary': !active,
  };

  const buttonClasses = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'border-0', activeClassesConfig);
  const dropdownClasses = cn('border-0', activeClassesConfig);

  if (removable) {
    return (
      <Nav.Item>
        <Dropdown as={ButtonGroup} className="w-100 position-static" align="end">
          <Button className={buttonClasses} onClick={changeChannel}>
            <span className="me-1">#</span>
            {title}
          </Button>

          <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className={dropdownClasses} />

          <Dropdown.Menu id="dropdown-split-basic">
            <Dropdown.Item>Переименовать</Dropdown.Item>
            <Dropdown.Item>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item>
      <Button variant={variant} className={buttonClasses} onClick={changeChannel}>
        <span className="me-1">#</span>
        {title}
      </Button>
    </Nav.Item>
  );
};

export default ChannelButton;
