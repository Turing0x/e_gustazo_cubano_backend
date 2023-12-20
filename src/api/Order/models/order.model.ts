import { Product } from "../../Product/models/product.model"

export type Order = {
  finish: boolean,
  product_list: [Product],
  date: string,
  invoice_number: string,
  total_amount: number,
  commision: number,
  seller: {
    full_name: string
    referal_code: string
  }
}
