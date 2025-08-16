const handleLogin = async (values) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, values);

    if (response.data.success) {
      // Store in Redux
      dispatch(setCredentials({
        user: response.data.user,
        token: response.data.token
      }));
      
      // Also store in localStorage as backup
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.user.email);
      
      navigate('/dashboard');
    } else {
      setError(response.data.message || 'Login failed');
    }
  } catch (error) {
    // Error handling...
  }
};