export interface IFarm {
  id: string;
  phone: string;
  userId: string;
  farmName: string;
  farmAddress: string;
}

export interface IGetFarmQuery {
  id?: string;
  page?: number;
  size?: number;
}
