import { Request as expressRequest } from "express";
import { IUser } from "./users";

export interface Request extends expressRequest {
  user?: Omit<IUser, "password">;
}

export interface IUserToken {
  userDetails: IUserDetails;
  refreshToken: string;
  accessToken: string;
  farm?: IfarmIdAndName[];
}

export interface IUserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

interface IfarmIdAndName {
  id: string;
  name: string;
}
