import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form, Modal as BModal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { closeModal } from '@/redux/slices/modals/modalsSlice';
import { useAddChannelMutation, useRemoveChannelMutation } from '@/redux/api/chatWebsocketApi';
import { IModalTypes } from '@/types';
import { selectAllChannels } from '@/redux/slices/channels/channelsSlice';

interface BaseModalProps {
  opened: boolean;
  type: IModalTypes | null;
}

interface ModalBodyProps {
  onClose: () => void;
}

const AddChannelModalBody = ({ onClose }: ModalBodyProps): JSX.Element => {
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

const RemoveChannelModalBody = ({ onClose }: ModalBodyProps) => {
  const channelId = useAppSelector((state) => state.modalsInformation.extra);
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const removeChannelHandler = () => {
    if (!channelId) {
      return;
    }

    removeChannel({ id: channelId });

    onClose();
  };

  return (
    <>
      <BModal.Header closeButton onHide={onClose}>
        <BModal.Title>Удалить канал</BModal.Title>
      </BModal.Header>

      <BModal.Body>
        Вы уверены?
      </BModal.Body>

      <BModal.Footer>
        <Button variant="danger" onClick={onClose}>
          Отменить
        </Button>

        <Button onClick={removeChannelHandler} disabled={isLoading}>
          Удалить
        </Button>
      </BModal.Footer>
    </>
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
      {type === IModalTypes.RemoveChannel && <RemoveChannelModalBody onClose={closeHandler} />}
    </BModal>
  );
};

export default Modal;
