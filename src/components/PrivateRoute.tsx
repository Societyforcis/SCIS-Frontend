import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import { ReactNode } from 'react';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !token) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
          message: 'Please login to access this page.',
        }}
        replace
      />
    );
  }

  return children;
}