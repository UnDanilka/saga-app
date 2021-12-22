export interface IStore {
  productsReducer: {
    products: [];
    loading: boolean;
    error: string;
  };
}

export interface IProduct {
  id: number;
  name: string;
  email: string;
  count: number;
  price: number;
  delivery: { country: string; cities: string[] };
}

export interface IProductProps {
  product: IProduct;
}

export interface IModalProps {
  productsState: IProduct[];
}

export interface ITable {
  data: {
    products: IProduct[];
    loading: boolean;
  };
}

export interface ISearch {
  products: IProduct[];
  setProductsState: React.Dispatch<React.SetStateAction<IProduct[]>>;
  searchValue: string;
}

export interface ISorting {
  name: null | string;
  price: null | string;
}

export type productType = IProduct | undefined;
