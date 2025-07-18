import BannerSection from './components/banner-section'
import CategorySection from './components/category-section'
import FeaturedProducts from './components/featured-product'
import HeroBanner from './components/hero-banner'
import { useProducts } from '@/hooks/products/useProduct'

const HomePage = () => {
	const { products: products1 } = useProducts({ page: 1, limit: 2 })
	const { products: products2 } = useProducts({ page: 2, limit: 1 })

	return (
		<div>
			{/* Hero Banner Slider */}
			<HeroBanner />

			{/* Categories Section */}
			<CategorySection />

			{/* Promotional Banners */}
			<BannerSection />

			{/* Featured Products */}
			<FeaturedProducts title='SẢN PHẨM BÁN CHẠY' viewAllLink='/collection/ban-chay-nhat' products={products1} />

			{/* New Products */}
			<FeaturedProducts title='SẢN PHẨM MỚI' viewAllLink='/collection/san-pham-moi' products={products2} />
		</div>
	)
}

export default HomePage
