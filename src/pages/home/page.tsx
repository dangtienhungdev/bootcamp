import BannerSection from './components/banner-section'
import CategorySection from './components/category-section'
import FeaturedProducts from './components/featured-product'
import HeroBanner from './components/hero-banner'

const HomePage = () => {
	return (
		<div>
			{/* Hero Banner Slider */}
			<HeroBanner />

			{/* Categories Section */}
			<CategorySection />

			{/* Promotional Banners */}
			<BannerSection />

			{/* Featured Products */}
			<FeaturedProducts title='SẢN PHẨM BÁN CHẠY' viewAllLink='/collection/ban-chay-nhat' />

			{/* New Products */}
			<FeaturedProducts title='SẢN PHẨM MỚI' viewAllLink='/collection/san-pham-moi' />
		</div>
	)
}

export default HomePage
