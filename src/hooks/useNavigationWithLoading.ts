import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useNavigationWithLoading = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const navigateWithLoading = async (path: string) => {
    setIsLoading(true);
    await navigate(path);
    setIsLoading(false);
  };

  return { navigateWithLoading, isLoading };
};
