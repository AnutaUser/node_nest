export interface JWTPayload {
  id?: string;
  username: string;
  age?: number;
  email: string;
  password: string;
  city?: string;
  avatar?: string;
  status: boolean;
}
