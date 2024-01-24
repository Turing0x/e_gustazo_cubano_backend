import { Product } from "../../Product/models/product.model"
import { User } from "../../User/models/user.model"

export type Order = {
  finish: boolean,
  product_list: [Product],
  date: string,
  invoice_number: string,
  pending_number: string,
  total_amount: number,
  commission: number,
  buyer: User,
  seller: User
}
