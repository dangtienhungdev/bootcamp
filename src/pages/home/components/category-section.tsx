import { Link } from 'react-router-dom'
import { useCategories } from '@/hooks/category/useCategories'

const CategorySection = () => {
	const { categories } = useCategories()

	return (
		<section className='py-8'>
			<div className='container-coolmate'>
				<div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4'>
					{categories.map((category) => (
						<Link key={category._id} to={`/collection/${category.slug}`} className='category-item'>
							<div className='overflow-hidden rounded-md w-20 h-20 mx-auto'>
								<img
									src={category.thumbnail}
									alt={category.name}
									width={80}
									height={80}
									className='object-cover w-full h-full hover:scale-110 transition-transform duration-300'
								/>
							</div>
							<span className='text-xs font-medium'>{category.name}</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}

export default CategorySection
