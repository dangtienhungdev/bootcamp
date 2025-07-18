import { Link } from 'react-router-dom'

const BannerSection = () => {
	return (
		<section className='py-10'>
			<div className='container-coolmate'>
				{/* Daily Casual Wear Banner */}
				<div className='relative rounded-lg overflow-hidden mb-10'>
					<div className='relative aspect-[21/9] md:aspect-[21/7]'>
						<img
							src='https://ext.same-assets.com/916749146/115639525.webp'
							alt='Daily Casual Wear'
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-8 md:p-16'>
							<h2 className='text-white text-3xl md:text-4xl font-bold mb-2'>MẶC HẰNG NGÀY</h2>
							<p className='text-white text-sm md:text-base mb-4 max-w-md'>
								Thoải mái, thanh lịch | Nhập CM10 Giảm 10% đơn từ 600K
							</p>
							<Link
								to='/collection/do-casual'
								className='text-sm px-5 py-2 bg-white text-black rounded hover:bg-primary hover:text-white transition-colors inline-block w-fit font-medium'
							>
								Khám phá ngay
							</Link>
						</div>
					</div>
				</div>

				{/* Two Column Banners */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
					{/* Men Collection Banner */}
					<div className='relative rounded-lg overflow-hidden'>
						<div className='relative aspect-[16/10]'>
							<img
								src='https://ext.same-assets.com/916749146/2871351368.webp'
								alt='Men Collection'
								className='object-cover'
							/>
							<div className='absolute inset-0 flex flex-col justify-center p-6'>
								<div className='max-w-[180px]'>
									<h3 className='text-white text-xl font-bold mb-1'>MEN WEAR COLLECTION</h3>
									<p className='text-white text-xs mb-3'>
										Nhập <strong>CM10</strong> Giảm 10% đơn từ 600K
									</p>
									<Link
										to='/nam'
										className='text-xs px-4 py-1.5 bg-white text-black rounded hover:bg-primary hover:text-white transition-colors inline-block w-fit font-medium'
									>
										Mua ngay
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Women Collection Banner */}
					<div className='relative rounded-lg overflow-hidden'>
						<div className='relative aspect-[16/10]'>
							<img
								src='https://ext.same-assets.com/916749146/1602327242.webp'
								alt='Women Collection'
								className='object-cover'
							/>
							<div className='absolute inset-0 flex flex-col justify-center p-6'>
								<div className='max-w-[180px]'>
									<p className='text-black text-xs font-medium mb-1'>Chính thức ra mắt</p>
									<h3 className='text-black text-xl font-bold mb-1'>WOMEN ACTIVE COLLECTION</h3>
									<p className='text-black text-xs mb-3'>
										Nhập <strong>CMWMHELLO</strong> Giảm 15% tối đa 100K
									</p>
									<Link
										to='/nu'
										className='text-xs px-4 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors inline-block w-fit font-medium'
									>
										Mua ngay
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Running Collection Banner */}
				<div className='relative rounded-lg overflow-hidden'>
					<div className='relative aspect-[21/9] md:aspect-[21/7]'>
						<img
							src='https://ext.same-assets.com/916749146/4163307338.webp'
							alt='Running Collection'
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-8 md:p-16'>
							<h2 className='text-white text-3xl md:text-4xl font-bold mb-2'>ĐỒ CHẠY BỘ</h2>
							<p className='text-white text-sm md:text-base mb-4 max-w-md'>
								Siêu nhẹ, siêu thoáng khí | Mua combo tiết kiệm đến 30%
							</p>
							<Link
								to='/collection/quan-ao-chay-bo'
								className='text-sm px-5 py-2 bg-white text-black rounded hover:bg-primary hover:text-white transition-colors inline-block w-fit font-medium'
							>
								Khám phá ngay
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BannerSection
