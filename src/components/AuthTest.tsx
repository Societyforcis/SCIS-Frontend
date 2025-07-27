import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

const AuthTest: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAppSelector(state => state.auth);

  const testAuth = async () => {
    setLoading(true);
    try {
      // Get token from Redux and fallback to localStorage
      const authToken = token || localStorage.getItem('token');
      const email = user?.email || localStorage.getItem('email');
      
      console.log('Auth test with:', { 
        hasToken: !!authToken, 
        tokenLength: authToken?.length,
        email
      });
      
      const response = await axios.get(
        'http://localhost:5000/api/membership/auth-check',
        {
          headers: { 
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json' 
          }
        }
      );
      
      setTestResult({
        success: true,
        data: response.data,
        status: response.status
      });
    } catch (error) {
      console.error('Auth test failed:', error);
      setTestResult({
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Authentication Test</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={testAuth}
        disabled={loading}
      >
        {loading ? 'Testing...' : 'Test Authentication'}
      </button>
      
      {testResult && (
        <div className="mt-4">
          <h3 className="font-bold">Test Result:</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60 text-xs">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-4">
        <h3 className="font-bold">Current Auth State:</h3>
        <p>Redux User: {user?.email || 'Not set'}</p>
        <p>Redux Token: {token ? 'Present' : 'Not set'}</p>
        <p>LocalStorage Email: {localStorage.getItem('email') || 'Not set'}</p>
        <p>LocalStorage Token: {localStorage.getItem('token') ? 'Present' : 'Not set'}</p>
      </div>
    </div>
  );
};

export default AuthTest;