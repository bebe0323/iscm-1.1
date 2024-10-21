
// user type that is exposed to client side
export interface UserClient {
  name: string;
  email: string;
  role: number;  // 0 - worker, 1 - admin, 2-ultra admin
  id: string;
  iat?: number;   // issued at
  exp?: number;   // expiration
}

export interface JwtPayloadType {
  email: string;
  role: number;
  user_id: string;
  exp: number;
}
