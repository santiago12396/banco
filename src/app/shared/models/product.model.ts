export interface IProductResp {
  data: IProduct[];
}
export interface IProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export interface ICreateProductDTO extends Omit<IProduct, 'id'>  {}
export interface IUpdateProductDTO extends Partial<IProduct> {}

export interface IAlterProductResp {
  message: string;
  product: IProduct;
}
