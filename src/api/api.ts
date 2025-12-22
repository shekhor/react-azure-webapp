/**
 * API utility functions for making HTTP requests
 * Uses VITE_API_URL environment variable configured in Azure App Service
 */

// Get the API URL from environment variables
// Vite automatically injects VITE_* prefixed variables at build time
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Example API call function that reads from VITE_API_URL
 * @param endpoint - The API endpoint path (e.g., '/users', '/data')
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Promise with the response data
 */
export async function apiCall<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${path}`;

  // Default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

/**
 * Example: GET request helper
 */
export async function get<T = unknown>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: 'GET' });
}

/**
 * Example: POST request helper
 */
export async function post<T = unknown>(
  endpoint: string,
  body: unknown
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Example: PUT request helper
 */
export async function put<T = unknown>(
  endpoint: string,
  body: unknown
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Example: DELETE request helper
 */
export async function del<T = unknown>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: 'DELETE' });
}

// Export the API URL for reference if needed
export { API_URL };






