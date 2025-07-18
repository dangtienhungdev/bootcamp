import { Card, CardContent } from '@/components/ui/card'

import { Link } from 'react-router-dom'

// Mock product data
const products = [
	{
		id: 1,
		name: 'Áo Thun Nam Cotton 220GSM',
		price: 179000,
		salePrice: 161000,
		image: '/images/product1.webp',
		slug: 'ao-thun-100-cotton-220gsm',
		colors: ['#AC9B86', '#2D3138', '#B8C7D7', '#385676'],
		rating: 4.8,
		reviewCount: 189,
		isHot: true
	},
	{
		id: 2,
		name: 'Áo Polo Nam Pique Cotton',
		price: 299000,
		salePrice: 254000,
		image: '/images/product2.webp',
		slug: 'polo-pique-basic-cotton-100',
		colors: ['#2D3138', '#FFFFFF', '#385676', '#556B2F'],
		rating: 4.8,
		reviewCount: 263,
		isHot: true
	},
	{
		id: 3,
		name: 'Quần Chino Nam 7 inch',
		price: 379000,
		salePrice: null,
		image: '/images/product3.webp',
		slug: 'quan-chino-nam-7-inch',
		colors: ['#2D3138', '#556B2F', '#AA8B67'],
		rating: 4.6,
		reviewCount: 78,
		isNew: true
	},
	{
		id: 4,
		name: 'Áo Sơ Mi Dài Tay Essentials Cotton',
		price: 399000,
		salePrice: 359000,
		image: 'https://ext.same-assets.com/916749146/2782288388.webp',
		slug: 'ao-so-mi-essentials-100-cotton-dai-tay-mem-mai2',
		colors: ['#385676', '#FFFFFF', '#2D3138'],
		rating: 4.8,
		reviewCount: 75,
		isBestSeller: true
	}
]

const FeaturedProducts = ({ title = 'SẢN PHẨM NỔI BẬT', viewAllLink = '/collection/ban-chay-nhat' }) => {
	return (
		<section className='py-10'>
			<div className='container-coolmate'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold'>{title}</h2>
					<Link to={viewAllLink} className='text-sm text-primary font-medium hover:underline'>
						Xem thêm
					</Link>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
					{products.map((product) => (
						<Card
							key={product.id}
							className='border-0 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow'
						>
							<Link to={`/product/${product.slug}`}>
								<div className='relative group'>
									<div className='aspect-square overflow-hidden'>
										<img
											src={product.image}
											alt={product.name}
											width={400}
											height={400}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
										/>
									</div>

									{/* Product labels */}
									<div className='absolute top-2 left-2 flex flex-col gap-1'>
										{product.isHot && (
											<span className='bg-orange-500 text-white text-xs px-2 py-0.5 rounded'>
												Đang mua
											</span>
										)}
										{product.isNew && (
											<span className='bg-blue-500 text-white text-xs px-2 py-0.5 rounded'>
												new
											</span>
										)}
										{product.isBestSeller && (
											<span className='bg-green-500 text-white text-xs px-2 py-0.5 rounded'>
												Bán chạy
											</span>
										)}
										{product.salePrice && (
											<span className='bg-red-500 text-white text-xs px-2 py-0.5 rounded'>
												-{Math.round(100 - (product.salePrice / product.price) * 100)}%
											</span>
										)}
									</div>

									{/* Color options */}
									<div className='absolute bottom-2 left-2 flex gap-1'>
										{product.colors.map((color, index) => (
											<div
												key={index}
												className='w-4 h-4 rounded-full border border-gray-300'
												style={{ backgroundColor: color }}
											/>
										))}
									</div>
								</div>

								<CardContent className='p-3'>
									<h3 className='text-sm font-medium line-clamp-2 h-10 mb-1'>{product.name}</h3>

									<div className='flex items-center gap-1 mb-2'>
										<div className='flex'>
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													className={`w-3 h-3 ${
														i < Math.floor(product.rating)
															? 'text-yellow-500'
															: 'text-gray-300'
													}`}
													fill='currentColor'
													viewBox='0 0 20 20'
												>
													<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
												</svg>
											))}
										</div>
										<span className='text-xs text-gray-500'>({product.reviewCount})</span>
									</div>

									<div className='flex items-center gap-2'>
										{product.salePrice ? (
											<>
												<span className='text-base font-semibold text-red-500'>
													{new Intl.NumberFormat('vi-VN').format(product.salePrice)}₫
												</span>
												<span className='text-sm line-through text-gray-500'>
													{new Intl.NumberFormat('vi-VN').format(product.price)}₫
												</span>
											</>
										) : (
											<span className='text-base font-semibold'>
												{new Intl.NumberFormat('vi-VN').format(product.price)}₫
											</span>
										)}
									</div>
								</CardContent>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default FeaturedProducts
