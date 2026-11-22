import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

export type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'INCREASE_QUANTITY'; productId: number }
  | { type: 'DECREASE_QUANTITY'; productId: number }
  | { type: 'REMOVE_FROM_CART'; productId: number }

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find((item) => item.product.id === action.product.id)
      if (existingItem) {
        return state.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...state, { product: action.product, quantity: 1 }]
    }
    case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    case 'DECREASE_QUANTITY':
      return state.map((item) =>
        item.product.id === action.productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.product.id !== action.productId)
    default:
      return state
  }
}
