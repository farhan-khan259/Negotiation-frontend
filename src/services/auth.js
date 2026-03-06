const API_URL = 'http://localhost:8000/api/v1';

export const authService = {
  async login(email, password) {
    // FastAPI's OAuth2PasswordRequestForm expects form-urlencoded data
    // and the field 'username' instead of 'email'
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    console.log("Login request to:", `${API_URL}/auth/login`);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("Login response status:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error response:", errorData);
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      console.log("Login success, token received:", !!data.access_token);
      // Store token in localStorage
      localStorage.setItem('token', data.access_token);
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Login request timed out or backend not responding");
        throw new Error('Connection timeout - please check if backend is running on http://localhost:8000');
      }
      console.error("Login catch error:", error.message);
      throw error;
    }
  },

  async register(userData) {
    // Backend expects: email, password, name, company_name (optional)
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }

    return await response.json();
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  }
};
