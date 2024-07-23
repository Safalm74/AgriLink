export interface IFarm {
  id: string;
  phone: string;
  userId: string;
  farm_name: string;
  farm_address: string;
}

export interface IGetFarmQuery {
  id?: string;
  page?: number;
  size?: number;
}
