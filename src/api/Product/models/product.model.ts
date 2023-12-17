export type Product = {
  name: string;
  description: string;
  photo: string;
  price: number;
  in_stock: number;
  commission: number;
  discount: {
    more_than: number,
    discount: number,
  };
}
