import { Link } from 'react-router-dom'
import type { Product } from '@/types/product.type'
import ProductCard from '@/components/product-card'
import { ShoppingCart } from 'lucide-react'

interface FeaturedProductsProps {
	title?: string
	viewAllLink?: string
	products: Product[]
}

const FeaturedProducts = ({
	title = 'SẢN PHẨM NỔI BẬT',
	viewAllLink = '/collection/ban-chay-nhat',
	products = []
}: FeaturedProductsProps) => {
	return (
		<section className='py-10'>
			<div className='container-coolmate'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold'>{title}</h2>
					<Link to={viewAllLink} className='text-sm text-primary font-medium hover:underline'>
						Xem thêm
					</Link>
				</div>

				{products && products.length === 0 && (
					<section className='py-10'>
						<div className='container-coolmate'>
							<div className='flex justify-center items-center h-full'>
								<h2 className='text-xl font-bold text-center flex flex-col items-center gap-2'>
									<ShoppingCart className='w-10 h-10 text-primary' />
									Không có sản phẩm
								</h2>
							</div>
						</div>
					</section>
				)}

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
					{products &&
						products.length > 0 &&
						products.map((product) => <ProductCard key={product._id} product={product} />)}
				</div>
			</div>
		</section>
	)
}

export default FeaturedProducts
