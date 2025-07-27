export const checkApiStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data?.status === 'ok';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};