import { Provider } from 'react-redux';
import Router from '@/routes/Router';
import { AuthProvider } from '@/context/Auth';
import store from './store';
import '@/style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </Provider>
);

export default App;
