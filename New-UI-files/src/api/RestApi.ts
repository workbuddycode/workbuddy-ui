// RestAPI.ts
// Centralized API endpoints for WorkBuddy services (TypeScript)

const BASE_URL: string = "http://localhost:8080/workbuddy-user-service";

export const API_ROUTE = {
  WORKBUDDY: `${BASE_URL}/work-buddy-user`,
  CLIENT: `${BASE_URL}`
} as const;

const API = {
  // WorkBuddy User Service
  REGISTER_USER: `${API_ROUTE.WORKBUDDY}/register-user`,
  LOGIN_USER: `${API_ROUTE.WORKBUDDY}/login`,

  // Client Service
  CREATE_CLIENT: `${API_ROUTE.CLIENT}/OrganizationDetails`,
  GET_CLIENT: `${API_ROUTE.CLIENT}/get`,
  UPDATE_CLIENT: `${API_ROUTE.CLIENT}/update`,
  DELETE_CLIENT: `${API_ROUTE.CLIENT}/delete`
} as const;

export default API;
