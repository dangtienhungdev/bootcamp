import type { Params } from './common.type'
import type { Product } from './product.type'

export type Category = {
	_id: string
	name: string
	slug: string
	description: string
	thumbnail: string
	products: Product[]
	isActive: boolean
	isDeleted: boolean
	createdAt: string
	updatedAt: string
}

// params category
export type ParamsCategory = Params
