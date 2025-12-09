export interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    password: string;
    role: string;
    weight: number;
    height: number;
    gender: string;
    goal: string;
    connected: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface JwtPayload {
  userId: number;
  username: string;
}