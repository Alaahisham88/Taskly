import { User } from '../../../core/models/user.models';

export interface SignUpRequest {
  email: string;
  password: string;
  data: Data;
}

export interface Data {
  name: string;
  department: string;
}

export interface SignUpResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
}
