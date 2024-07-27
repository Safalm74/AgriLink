export interface ICreateCartItemBody {
  id?: string;
  productId: string;
  userId?: string;
  quantity: number;
}

export interface IGetCartItemQuery {
  id?: string;
  page?: number;
  size?: number;
}
