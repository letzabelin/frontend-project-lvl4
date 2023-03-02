import ReactDOM from 'react-dom/client';
import init from './init';

const app = (): void => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(init());
};

app();
