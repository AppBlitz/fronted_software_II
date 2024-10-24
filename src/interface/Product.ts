interface Products {
  id: string;
  nameSupplier: string;
  nameProduct: string;
  priceProduct: number;
  amountProduct: number;
  amountMinProduct: number;
  images: string;
  amountForProduct: number;
  stateProduct: string;
}
interface RemoveProducts {
  id: number | string;
}

export type { Products, RemoveProducts };
