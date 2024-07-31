import { Request as expressRequest } from "express";
import { IUser } from "./users";

export interface Request extends expressRequest {
  user?: Omit<IUser, "password">;
}

export interface ITokenPlayload {
  id: string;
  name: string;
  email: string;
  roleId: string;
}

export interface IUserToken {
  userDetails: IUserDetails;
  refreshToken: string;
  accessToken: string;
  farm?: IFarmIdAndName[];
}

export interface IUserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

interface IFarmIdAndName {
  id: string;
  name: string;
}
