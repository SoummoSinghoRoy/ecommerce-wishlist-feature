import { ObjectId } from "mongoose";

// API Response Shape
interface AuthApiResponse {
  status: number;
  error?: {
    message: string | object
  };
  message?: string;
  data?: {
    id?: any;
    username?: string;
    email?: string;
  },
  token?: any;
  isAuthenticated?: boolean;
}

interface ProductApiResponse {
  status: number;
  message?: string;
  error?: {
    message: string | object
  };
  data?: {
    [key: string]: [] | object
  }
}

// Validation shape
interface LogInRequestBody {
  email: string;
  password: string;
}

interface LogInValidationResult {
  error: object;
  isValid: boolean;
}

interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

interface SignUpValidationResult {
  error: object;
  isValid: boolean;
}

// DB Model shape
interface IUser {
  username: string;
  email: string;
  password: string;
}

interface IProduct {
  [key: string]: any
}

interface IWishlist {
  userId: ObjectId,
  products: ObjectId[]
}


export type { 
  AuthApiResponse, 
  ProductApiResponse, 
  LogInRequestBody, 
  LogInValidationResult, 
  SignUpRequestBody, 
  SignUpValidationResult,
  IUser, IProduct, IWishlist 
};