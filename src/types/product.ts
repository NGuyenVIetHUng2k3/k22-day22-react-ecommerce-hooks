export interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
  description: string
  images?: string[]
  rating?: number
}

export interface ProductsResponse {
  products: Product[]
}
