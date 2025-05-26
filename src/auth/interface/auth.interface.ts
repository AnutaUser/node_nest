export interface JWTPayload {
  id?: string;
  username: string;
  age?: number;
  email: string;
  password: string;
  address?: {
    kode?: string;
    city?: string;
    street?: string;
    number?: string;
  };
  avatar?: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
