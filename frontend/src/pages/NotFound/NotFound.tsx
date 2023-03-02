import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = (): JSX.Element => (
  <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
    <h1 className="mb-3">Ошибка 404</h1>

    <p className="fw-bold mb-2">Что случилось?</p>

    <p>Вы попали на страницу, которой не существует</p>

    <p className="fw-bold mb-2">Почему это произошло?</p>

    <p>
      В большинстве ситуаций ошибка 404 отображается, если связь с сервером установлена, но информации по заданному запросу нет. Возможно, в адресе опечатка —
      такое случается при ручном наборе. Или страница была удалена, но сохранилась в закладках вашего браузера
    </p>

    <p className="fw-bold mb-2">Что делать?</p>

    <p>
      <span>Поскольку мы не знаем, как и откуда вы попали на эту страницу, то рекомендуем начать </span>
      <Link to="/">с главной</Link>
    </p>
  </Container>
);

export default NotFound;
