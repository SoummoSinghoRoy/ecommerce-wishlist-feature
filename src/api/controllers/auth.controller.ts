import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthApiResponse } from '../../Types/types';
import env_variables from '../../config/custom_env_variables';

import signupValidation from "../../validation/signup.validation";
import User from "../../model/User.model";
import logInValidation from "../../validation/login.validation";

export const signUpPostController = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const validation = await signupValidation({ username, email, password });

  if (!validation.isValid) {
    const validationresult: AuthApiResponse = {
      status: 400,
      message: 'Error occurred',
      error: {
        message: validation.error
      }
    }
    res.json(validationresult)
  } else {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
          const response: AuthApiResponse = {
            status: 500,
            message: 'Error occurred, get back soon',
            error: { message: 'Internal server error' }
          }
          res.json(response)
        } else {
          const registeredUser = new User({
            username,
            email,
            password: hash,
          })
          const user = await registeredUser.save()
          const response: AuthApiResponse = {
            status: 200,
            message: 'User successfully created',
            data: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          }
          res.json(response)
        }
      })
    } catch (error) {
      console.log(error);
      const response: AuthApiResponse = {
        status: 500,
        message: 'Error occurred, get back soon',
        error: { message: 'Internal server error' }
      }
      res.json(response)
    }
  }
}

export const logInPostController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const validation = await logInValidation({ email, password });
  if (!validation.isValid) {
    const validationresult: AuthApiResponse = {
      status: 400,
      message: 'Error occurred',
      error: {
        message: validation.error
      }
    }
    res.json(validationresult)
  } else {
    try {
      const validUser = await User.findOne({ email });
      jwt.sign({
        id: validUser!._id,
        username: validUser!.username, email: validUser!.email
      }, env_variables.secret_key, { expiresIn: '12h' }, (err, token) => {
        if (err) {
          console.log(err);
          const response: AuthApiResponse = {
            status: 500,
            message: 'Error occurred, get back soon',
            error: { message: 'Internal server error' }
          }
          res.json(response)
        }
        if (token) {
          const response: AuthApiResponse = {
            status: 200,
            message: 'Successfully loggedin',
            isAuthenticated: true,
            token: 'Bearer ' + token,
            data: {
              id: validUser!._id,
              username: validUser!.username,
            },
          }
          res.json(response);
        } else {
          const response: AuthApiResponse = {
            status: 401,
            message: 'Authorization failed',
            isAuthenticated: false
          }
          res.json(response)
        }
      })
    } catch (error) {
      console.log(error);
      const response: AuthApiResponse = {
        status: 500,
        message: 'Error occurred, get back soon',
        error: { message: 'Internal server error' }
      }
      res.json(response)
    }
  }
}

export const logoutPostController = async (req: Request, res: Response): Promise<void> => {
  try {    
    const response: AuthApiResponse = {
      status: 200,
      message: 'Successfully loggedout',
      isAuthenticated: false
    }
    res.json(response)
  } catch (error) {
    console.log(error);
    const response: AuthApiResponse = {
      status: 500,
      message: 'Error occurred, get back soon',
      error: { message: 'Internal server error' }
    }
    res.json(response)
  }
}