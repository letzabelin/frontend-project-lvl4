import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const App = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <h1>This is great app. Again</h1>;
};

export default App;
