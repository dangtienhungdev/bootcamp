export type Category = {
  _id: string
  name: string
  description: string
  products: string[]
  isActive: boolean
  isDeleted: boolean
  thumbnail: string
  createdAt: string
  updatedAt: string
  slug: string
}

export type CreateCategoryType = Pick<Category, 'name' | 'description' | 'thumbnail' | 'isActive' | 'isDeleted'>
