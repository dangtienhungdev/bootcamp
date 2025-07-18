import { Link } from 'react-router-dom'

const CategorySection = () => {
	const categories = [
		{
			id: 1,
			name: 'ÁO THUN',
			image: '/images/tshirt.webp',
			link: '/collection/ao-thun-nam'
		},
		{
			id: 2,
			name: 'SƠ MI',
			image: '/images/shirt.webp',
			link: '/collection/ao-so-mi-nam'
		},
		{
			id: 3,
			name: 'ÁO KHOÁC',
			image: '/images/jacket.webp',
			link: '/collection/ao-khoac-nam'
		},
		{
			id: 4,
			name: 'QUẦN DÀI',
			image: '/images/pants.webp',
			link: '/collection/quan-dai-nam'
		},
		{
			id: 5,
			name: 'QUẦN SHORT',
			image: 'https://ext.same-assets.com/916749146/2818501648.webp',
			link: '/collection/quan-short-nam'
		},
		{
			id: 6,
			name: 'QUẦN LÓT',
			image: 'https://ext.same-assets.com/916749146/3822568631.webp',
			link: '/collection/quan-lot-nam'
		},
		{
			id: 7,
			name: 'PHỤ KIỆN',
			image: 'https://ext.same-assets.com/916749146/4099094598.webp',
			link: '/collection/phu-kien-nam'
		}
	]

	return (
		<section className='py-8'>
			<div className='container-coolmate'>
				<div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4'>
					{categories.map((category) => (
						<Link key={category.id} to={category.link} className='category-item'>
							<div className='overflow-hidden rounded-md w-20 h-20 mx-auto'>
								<img
									src={category.image}
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
