export interface Size {
	size: string;
	quantity: number;
	price: number;
	_id: string;
}

export interface Variant {
	color: string;
	sizes: Size[];
}

export interface CategoryV2 {
	_id: string;
	name: string;
	slug: string;
}

export interface ProductV2 {
	_id: string;
	name: string;
	description: string;
	price: number;
	discountPrice: number;
	category: CategoryV2;
	variants: Variant[];
	isActive: boolean;
	isDeleted: boolean;
	thumbnail: string;
	images: string[];
	createdAt: string;
	updatedAt: string;
	slug: string;
}

/*
{
			name: 'Sản phẩm 3',
			description:
				'<li><strong>OTIS CLUB</strong> sẽ giúp bạn giải quyết vấn đề giá thành, chất lượng và mẫu mã sản phẩm tốt nhất.</li>',
			price: 150000,
			category: '67d5c818ab5ab468f2887259',
			discountPrice: 100000,
			variants: [
				{
					color: 'Đỏ',
					sizes: [
						{ size: 'S', quantity: 10 },
						{ size: 'M', quantity: 5 },
					],
				},
				{
					color: 'Xanh',
					sizes: [
						{ size: 'S', quantity: 8 },
						{ size: 'M', quantity: 3 },
						{ size: 'L', quantity: 2 },
					],
				},
			],
			isActive: true,
			thumbnail:
				'https://thieuhoa.com.vn/wp-content/uploads/2022/07/9Qsuh31vTqEabWaOS4GKhFp1IeOdg2gqGZatKDCa.webp',
		}
*/

export type CreateProductBody = Pick<
	ProductV2,
	'name' | 'description' | 'price' | 'discountPrice' | 'isActive' | 'thumbnail'
> & {
	variants: {
		color: string;
		sizes: Omit<Size, '_id' | 'price'>[];
	}[];
	category: string;
};
