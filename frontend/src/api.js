// VITE_API_URL must include the /api suffix, e.g. http://localhost:5050/api
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5050/api').replace(/\/+$/, '');

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    throw new Error((data && data.error) || `Request failed (${res.status})`);
  }
  return data;
}

export const fetchProjects = () => request('/projects');

export const saveProject = (projectData) =>
  request('/projects', { method: 'POST', body: JSON.stringify(projectData) });

export const deleteProject = (id) =>
  request(`/projects/${encodeURIComponent(id)}`, { method: 'DELETE' });

export const fetchRates = () => request('/rates');

export const updateRates = (ratesData) =>
  request('/rates', { method: 'PUT', body: JSON.stringify(ratesData) });

export const calculateEstimate = (params) =>
  request('/estimate', { method: 'POST', body: JSON.stringify(params) });
