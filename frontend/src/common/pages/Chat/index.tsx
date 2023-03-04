import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '@/common/hooks/useAuth';

const Chat = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <h1>This is great app. Again</h1>;
};

export default Chat;
