export interface IProductResp {
  data: IProduct[];
}
export interface IProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface IAlterProductResp {
  message: string;
  product?: IProduct;
}
