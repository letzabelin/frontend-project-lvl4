import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form, Modal as BModal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { closeModal } from '@/redux/slices/modals/modalsSlice';
import { useAddChannelMutation } from '@/redux/api/chatWebsocketApi';
import { IModalTypes } from '@/types';
import { selectAllChannels } from '@/redux/slices/channels/channelsSlice';

interface BaseModalProps {
  opened: boolean;
  type: IModalTypes | null;
}

interface AddChannelModalBodyProps {
  onClose: () => void;
}

const AddChannelModalBody = ({ onClose }: AddChannelModalBodyProps): JSX.Element => {
  const channelNames = useAppSelector(selectAllChannels).map(({ name }) => name);
  const [addChannel, { isLoading }] = useAddChannelMutation();

  const channelScheme = yup.object({
    name: yup.string().trim().notOneOf(channelNames, 'Должно быть уникальным').required('Обязательное поле')
      .default(''),
  });

  const formik = useFormik({
    initialValues: channelScheme.getDefault(),
    validationSchema: channelScheme,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: (formData) => {
      const { name } = channelScheme.cast(formData);

      addChannel({ name });

      onClose();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <BModal.Header closeButton onHide={onClose}>
        <BModal.Title>Добавить канал</BModal.Title>
      </BModal.Header>

      <BModal.Body>
        <Form.Group>
          <Form.Control isInvalid={!!formik.errors.name} autoFocus required type="text" {...formik.getFieldProps('name')} />
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form.Group>
      </BModal.Body>

      <BModal.Footer>
        <Button variant="danger" onClick={onClose}>
          Отменить
        </Button>

        <Button type="submit" disabled={isLoading}>
          Добавить
        </Button>
      </BModal.Footer>
    </Form>
  );
};

const Modal = ({ opened, type }: BaseModalProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  return (
    <BModal show={opened} dialogClassName="modal-90w" centered onHide={closeHandler}>
      {type === IModalTypes.NewChannel && <AddChannelModalBody onClose={closeHandler} />}
    </BModal>
  );
};

export default Modal;
