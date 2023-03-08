import { StrictMode } from 'react';
import Router from '@/routes/Router';
import '@/style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = (): JSX.Element => {
  return (
    <StrictMode>
      <Router />
    </StrictMode>
  );
};

export default init;
