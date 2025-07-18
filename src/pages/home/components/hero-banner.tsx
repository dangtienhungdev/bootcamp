import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { Link } from 'react-router-dom'

const HeroBanner = () => {
	const banners = [
		{
			id: 1,
			image: '/images/hero1.jpeg',
			title: "Men's Collection 2024",
			subtitle: "Discover the new season's essentials",
			link: '/collection/do-nam'
		},
		{
			id: 2,
			image: 'https://ext.same-assets.com/916749146/1814308385.webp',
			title: 'Gym Collection',
			subtitle: 'Performance wear for every workout',
			link: '/collection/quan-ao-phu-kien-tap-gym'
		},
		{
			id: 3,
			image: 'https://ext.same-assets.com/916749146/437018006.webp',
			title: 'Running Essentials',
			subtitle: 'Breathable and comfortable for your run',
			link: '/collection/quan-ao-chay-bo'
		}
	]

	return (
		<div className='relative'>
			<Carousel className='w-full' opts={{ loop: true }}>
				<CarouselContent>
					{banners.map((banner) => (
						<CarouselItem key={banner.id} className='relative'>
							<div className='relative aspect-[16/8] sm:aspect-[18/7] md:aspect-[18/6] lg:aspect-[21/7] w-full overflow-hidden'>
								<img src={banner.image} alt={banner.title} className='object-cover' />

								{/* Content overlay */}
								<div className='absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center px-8 md:px-16'>
									<h2 className='text-white text-2xl md:text-4xl font-bold mb-2 md:mb-4 drop-shadow-md'>
										{banner.title}
									</h2>
									<p className='text-white text-sm md:text-lg mb-4 md:mb-6 max-w-md drop-shadow-md'>
										{banner.subtitle}
									</p>
									<Link
										to={banner.link}
										className='bg-white text-black px-6 py-2 rounded inline-block w-fit
                      hover:bg-primary hover:text-white transition-colors font-medium'
									>
										Khám phá ngay
									</Link>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className='hidden md:block'>
					<CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2' />
					<CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2' />
				</div>
			</Carousel>

			{/* Navigation dots */}
			<div className='absolute bottom-2 left-0 right-0 flex justify-center gap-2'>
				{banners.map((_, index) => (
					<span key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/40'}`} />
				))}
			</div>
		</div>
	)
}

export default HeroBanner
