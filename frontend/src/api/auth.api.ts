import api from '../lib/axios';
import { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../schemas/auth.schema';
import { AuthResponse } from '../types/auth.types';

export const authApi = {
  signup: async (data: SignupInput): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordInput) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordInput) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};
