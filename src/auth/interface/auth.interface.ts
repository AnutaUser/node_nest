export interface JWTPayload {
  id?: string;
  username: string;
  age?: number;
  email: string;
  password: string;
  address?: object;
  avatar?: string;
  status: boolean;
}
