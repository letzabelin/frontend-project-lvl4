import cn from 'classnames';
import { Button, ButtonGroup, Dropdown, Nav } from 'react-bootstrap';

interface Props {
  title: string;
  active?: boolean;
  removable?: boolean;
}

const ChannelButton = ({ title, active, removable }: Props): JSX.Element => {
  const variant = active ? 'primary' : 'outline-primary';

  const activeClassesConfig = {
    'bg-transparent': !active,
    'border-0': !active,
    'text-primary': !active,
  };

  const buttonClasses = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', activeClassesConfig);
  const dropdownClasses = cn(activeClassesConfig);

  if (removable) {
    return (
      <Nav.Item>
        <Dropdown as={ButtonGroup} className="w-100 position-static" align="end">
          <Button className={buttonClasses}>
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
      <Button variant={variant} className={buttonClasses}>
        <span className="me-1">#</span>
        {title}
      </Button>
    </Nav.Item>
  );
};

export default ChannelButton;
