import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axios';

// Update to match backend Role enum exactly
export type UserRole = 'CLIENT' | 'PROVIDER';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
}

export interface RegisterClientDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterProviderDto {
  email: string;
  password: string;
  CIN: string;
  isEnterprise: boolean;
  bio: string;
  location: string;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log('Attempting login with:', data.email);
    const response = await api.post<LoginResponse>('/auth/login', data);
    await AsyncStorage.setItem('jwt_token', response.data.token);
    await AsyncStorage.setItem('user_role', response.data.role);
    return response.data;
  } catch (error: any) {
    // Handle network errors
    if (!error.response) {
      console.error('Login error details: Network Error');
      throw new Error(
        'Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.'
      );
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      console.error('Login error details:', error.response.data);
      throw new Error('Email ou mot de passe incorrect.');
    }

    // Handle other errors
    console.error(
      'Login error details:',
      error.response?.data || error.message
    );
    throw new Error(
      'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
    );
  }
};

export const registerClient = async (data: RegisterClientDto) => {
  try {
    console.log('Sending registration data:', JSON.stringify(data));
    const response = await api.post('/auth/register/client', data);
    await AsyncStorage.setItem('jwt_token', response.data.token);
    await AsyncStorage.setItem('user_role', 'CLIENT');
    return response.data;
  } catch (error: any) {
    console.error(
      'Register error details:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const registerProvider = async (data: RegisterProviderDto) => {
  try {
    const response = await api.post('/auth/register/provider', data);
    await AsyncStorage.setItem('jwt_token', response.data.token);
    await AsyncStorage.setItem('user_role', 'PROVIDER');
    return response.data;
  } catch (error: any) {
    console.error(
      'Register error details:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// Make sure the logout function clears all authentication data
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('jwt_token');
    await AsyncStorage.removeItem('user_role');
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getUserRole = async (): Promise<UserRole | null> => {
  return (await AsyncStorage.getItem('user_role')) as UserRole | null;
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    console.error('Get user error:', error.response?.data || error.message);
    throw error;
  }
};
