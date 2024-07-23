export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  roleId: number;
}

export interface IGetUserQuery {
  id?: string;
  page?: number;
  size?: number;
}
