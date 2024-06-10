export type Order = {
  date: string,
  product: {
    id: string,
    cantToBuy: number;
  },
  owner: string
}
