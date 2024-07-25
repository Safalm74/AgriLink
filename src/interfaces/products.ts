export interface IProduct {
  id: string;
  farmId: string;
  productName: String;
  price: number;
  quantity: number;
  quantityUnit: string;
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
