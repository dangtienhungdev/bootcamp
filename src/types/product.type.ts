import type { Params } from './common.type'

export type Size = {
	size: string
	quantity: number
	price: number
	_id: string
}

export type Variant = {
	color: string
	sizes: Size[]
	_id: string
}

export type Category = {
	_id: string
	name: string
	slug: string
}

export type Product = {
	_id: string
	name: string
	description: string
	price: number
	discountPrice: number
	category: Category
	variants: Variant[]
	isActive: boolean
	isDeleted: boolean
	thumbnail: string
	images: string[]
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
	slug: string
}

// params product
export type ParamProduct = Params & {
	active?: boolean
	deleted?: boolean
}
