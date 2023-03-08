import cn from 'classnames';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

interface Props {
  title: string;
  active?: boolean;
  removable?: boolean;
}

const ChannelButton = (props: Props): JSX.Element => {
  const variant = props.active ? 'primary' : 'outline-primary';

  const activeClassesConfig = {
    'bg-transparent': !props.active,
    'border-0': !props.active,
    'text-primary': !props.active,
  };

  const buttonClasses = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', activeClassesConfig);
  const dropdownClasses = cn(activeClassesConfig);

  if (props.removable) {
    return (
      <Dropdown as={ButtonGroup} className="w-100 position-static" align="end">
        <Button className={buttonClasses}>
          <span className="me-1">#</span>
          {props.title}
        </Button>

        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className={dropdownClasses} />

        <Dropdown.Menu id="dropdown-split-basic">
          <Dropdown.Item>Переименовать</Dropdown.Item>
          <Dropdown.Item>Удалить</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Button variant={variant} className={buttonClasses}>
      <span className="me-1">#</span>
      {props.title}
    </Button>
  );
};

export default ChannelButton;
