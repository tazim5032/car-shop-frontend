export interface productItem {
  _id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}
export interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}
export interface TProductResponse {
  data: {
    result: TProduct[];
  };
  meta: any;
}

export interface TuserModal {
  product: {
    key: string;
    name: string;
    email: string;
    isBlocked: boolean;
  };
}

export interface TUpdateProduct {
  product: {
    key: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
  };
}
