export interface IProduct {
  id: string;
  farmId: string;
  productName: String;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  category: string;
}

export interface IGetProductQuery {
  id?: string;
  farmId?: string;
  page?: number;
  size?: number;
}
