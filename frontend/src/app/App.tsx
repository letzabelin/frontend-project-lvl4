import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from '@/redux/store';
import i18n from '@/app/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from '@/routes/Router';
import { AuthProvider } from '@/context/Auth';
import '@/style/index.css';

const init = (): JSX.Element => (
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </I18nextProvider>
  </StrictMode>
);

export default init;
