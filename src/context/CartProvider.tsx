import { useMemo, useReducer, type ReactNode } from 'react'
import { CartContext } from './CartContext'
import { cartReducer } from '../reducers/cartReducer'
import type { Product } from '../types/product'

interface CartProviderProps {
  children: ReactNode
}

function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const value = useMemo(
    () => ({
      cart,
      addToCart: (product: Product) => dispatch({ type: 'ADD_TO_CART', product }),
      increaseQuantity: (productId: number) => dispatch({ type: 'INCREASE_QUANTITY', productId }),
      decreaseQuantity: (productId: number) => dispatch({ type: 'DECREASE_QUANTITY', productId }),
      removeFromCart: (productId: number) => dispatch({ type: 'REMOVE_FROM_CART', productId }),
      totalQuantity,
      totalPrice,
    }),
    [cart, totalPrice, totalQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
