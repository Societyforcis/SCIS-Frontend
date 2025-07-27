import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import IDCard from './IDCard';

const IDCardLoader: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  useEffect(() => {
    const validateMembership = async () => {
      try {
        // If no ID parameter, check if user is logged in
        if (!id) {
          const token = localStorage.getItem('token');
          const email = localStorage.getItem('email');
          
          if (!token || !email) {
            setIsValid(false);
            return;
          }
          
          setIsValid(true);
          return;
        }
        
        // If ID parameter is present, validate it
        const response = await axios.get(
          `http://localhost:5000/api/membership/id/${id}/validate`,
          { timeout: 5000 }
        );
        
        setIsValid(response.data.valid);
      } catch (error) {
        console.error('Error validating membership:', error);
        setIsValid(false);
      }
    };
    
    validateMembership();
  }, [id]);
  
  if (isValid === null) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  if (isValid === false) {
    return <Navigate to="/login" replace />;
  }
  
  return <IDCard />;
};

export default IDCardLoader;