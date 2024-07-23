import { Request as expressRequest } from "express";
import { IUser } from "./users";

export interface Request extends expressRequest {
  user?: Omit<IUser, "password">;
}

export interface IUserToken {
    userId: string;
    refreshToken: string;
    accessToken: string;
  }