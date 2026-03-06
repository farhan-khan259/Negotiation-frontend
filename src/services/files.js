import { authService } from './auth';

const API_URL = 'http://localhost:8000/api/v1';

export const fileService = {
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = authService.getToken();
    if (!token) {
      const err = new Error('You are not logged in. Please sign in again.');
      err.name = 'AUTH';
      throw err;
    }
    
    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401 || response.status === 403) {
        const err = new Error('Session expired. Please sign in again.');
        err.name = 'AUTH';
        throw err;
      }
      throw new Error(errorData.detail || 'File upload failed');
    }

    return await response.json();
  },

  async getFiles() {
    const token = authService.getToken();
    if (!token) {
      const err = new Error('You are not logged in. Please sign in again.');
      err.name = 'AUTH';
      throw err;
    }
    
    const response = await fetch(`${API_URL}/files/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          const err = new Error('Session expired. Please sign in again.');
          err.name = 'AUTH';
          throw err;
        }
        throw new Error('Failed to fetch files');
    }

    return await response.json();
  }
};
