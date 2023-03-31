import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form, Modal as BModal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { closeModal } from '@/redux/slices/modals/modalsSlice';
import { useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation } from '@/redux/api/chatWebsocketApi';
import { IModalTypes } from '@/types';
import { selectAllChannels, selectChannelById } from '@/redux/slices/channels/channelsSlice';
import type { IChannel } from '@/types';

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
  const { t } = useTranslation();

  const channelScheme = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, t('common.errors.atLeast3AndLess20Characters') as string)
      .max(20, t('common.errors.atLeast3AndLess20Characters') as string)
      .notOneOf(channelNames, t('common.errors.unique') as string)
      .required(t('common.errors.required') as string)
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
        <BModal.Title>{t('chatPage.modals.addChannel.title')}</BModal.Title>
      </BModal.Header>

      <BModal.Body>
        <Form.Group>
          <Form.Control isInvalid={!!formik.errors.name} autoFocus required type="text" {...formik.getFieldProps('name')} />
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form.Group>
      </BModal.Body>

      <BModal.Footer>
        <Button variant="danger" onClick={onClose}>
          {t('chatPage.modals.common.cancelButton')}
        </Button>

        <Button type="submit" disabled={isLoading}>
          {t('chatPage.modals.addChannel.submitButton')}
        </Button>
      </BModal.Footer>
    </Form>
  );
};

const RemoveChannelModalBody = ({ onClose }: ModalBodyProps): JSX.Element => {
  const channelId = useAppSelector((state) => state.modalsInformation.extra);
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();
  const { t } = useTranslation();

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
        <BModal.Title>{t('chatPage.modals.removeChannel.title')}</BModal.Title>
      </BModal.Header>

      <BModal.Body>{t('chatPage.modals.removeChannel.confirmMessage')}</BModal.Body>

      <BModal.Footer>
        <Button variant="danger" onClick={onClose}>
          {t('chatPage.modals.common.cancelButton')}
        </Button>

        <Button onClick={removeChannelHandler} disabled={isLoading}>
          {t('chatPage.modals.removeChannel.submitButton')}
        </Button>
      </BModal.Footer>
    </>
  );
};

const EditChannelNameModalBody = ({ onClose }: ModalBodyProps): JSX.Element => {
  const channelId = useAppSelector((state) => state.modalsInformation.extra) as IChannel['id'];
  const channelNames = useAppSelector(selectAllChannels).map(({ name }) => name);
  const currentChannel = useAppSelector((state) => selectChannelById(state, channelId));
  const [renameChannel, { isLoading }] = useRenameChannelMutation();
  const formControlRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    formControlRef.current?.select();
  }, []);

  const channelScheme = yup.object({
    name: yup
      .string()
      .trim()
      .notOneOf(channelNames, t('common.errors.unique') as string)
      .required(t('common.errors.required') as string)
      .default(currentChannel?.name ?? ''),
  });

  const formik = useFormik({
    initialValues: channelScheme.getDefault(),
    validationSchema: channelScheme,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: (formData) => {
      const { name } = channelScheme.cast(formData);

      renameChannel({
        name,
        id: channelId,
      });

      onClose();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <BModal.Header closeButton onHide={onClose}>
        <BModal.Title>{t('chatPage.modals.renameChannel.title')}</BModal.Title>
      </BModal.Header>

      <BModal.Body>
        <Form.Group>
          <Form.Control ref={formControlRef} isInvalid={!!formik.errors.name} autoFocus required type="text" {...formik.getFieldProps('name')} />
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form.Group>
      </BModal.Body>

      <BModal.Footer>
        <Button variant="danger" onClick={onClose}>
          {t('chatPage.modals.common.cancelButton')}
        </Button>

        <Button type="submit" disabled={isLoading}>
          {t('chatPage.modals.renameChannel.submitButton')}
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
      {type === IModalTypes.RemoveChannel && <RemoveChannelModalBody onClose={closeHandler} />}
      {type === IModalTypes.EditChannelName && <EditChannelNameModalBody onClose={closeHandler} />}
    </BModal>
  );
};

export default Modal;
