import { FiInstagram, FiMail, FiPhone, FiYoutube } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='bg-[#171822] text-white pt-10 pb-6'>
			<div className='container-coolmate'>
				{/* Signup section */}
				<div className='flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8'>
					<div className='mb-4 md:mb-0'>
						<h3 className='text-lg font-semibold uppercase mb-1'>COOLMATE (tăng nghé bạn!)</h3>
						<p className='text-gray-400 text-sm'>
							Đăng ký nhận thông tin mới nhất và nhiều ưu đãi từ Coolmate
						</p>
					</div>
					<div className='flex w-full md:w-auto'>
						<Input
							placeholder='Email của bạn'
							className='bg-[#2e303e] border-0 text-white rounded-l-md rounded-r-none focus-visible:ring-0 w-full md:w-72'
						/>
						<Button className='bg-blue-600 hover:bg-blue-700 rounded-l-none'>ĐĂNG KÝ NGAY</Button>
					</div>
				</div>

				{/* Footer links */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-10'>
					<div>
						<h4 className='font-semibold uppercase mb-4'>COOLCLUB</h4>
						<ul className='space-y-3'>
							<li>
								<Link to='/page/coolclub' className='text-sm text-gray-400 hover:text-white'>
									CoolClub
								</Link>
							</li>
							<li>
								<Link to='/account/login' className='text-sm text-gray-400 hover:text-white'>
									Đăng nhập
								</Link>
							</li>
							<li>
								<Link to='/account/register' className='text-sm text-gray-400 hover:text-white'>
									Đăng ký
								</Link>
							</li>
							<li>
								<Link to='/page/uu-dai' className='text-sm text-gray-400 hover:text-white'>
									Ưu đãi
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold uppercase mb-4'>CHÍNH SÁCH</h4>
						<ul className='space-y-3'>
							<li>
								<Link to='/page/chinh-sach-doi-tra' className='text-sm text-gray-400 hover:text-white'>
									Chính sách đổi trả
								</Link>
							</li>
							<li>
								<Link to='/page/chinh-sach-bao-mat' className='text-sm text-gray-400 hover:text-white'>
									Chính sách bảo mật
								</Link>
							</li>
							<li>
								<Link to='/page/dieu-khoan-dich-vu' className='text-sm text-gray-400 hover:text-white'>
									Điều khoản dịch vụ
								</Link>
							</li>
							<li>
								<Link
									to='/page/chinh-sach-giao-hang'
									className='text-sm text-gray-400 hover:text-white'
								>
									Chính sách giao hàng
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold uppercase mb-4'>CHĂM SÓC KHÁCH HÀNG</h4>
						<ul className='space-y-3'>
							<li>
								<Link to='/page/trung-tam-cskh' className='text-sm text-gray-400 hover:text-white'>
									Trung tâm CSKH
								</Link>
							</li>
							<li>
								<Link to='/page/huong-dan-chon-size' className='text-sm text-gray-400 hover:text-white'>
									Hướng dẫn chọn size
								</Link>
							</li>
							<li>
								<Link to='/page/hoi-dap' className='text-sm text-gray-400 hover:text-white'>
									Hỏi đáp
								</Link>
							</li>
							<li>
								<Link to='/blog' className='text-sm text-gray-400 hover:text-white'>
									Blog
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold uppercase mb-4'>VỀ COOLMATE</h4>
						<ul className='space-y-3'>
							<li>
								<Link to='/page/coolmate-101' className='text-sm text-gray-400 hover:text-white'>
									Câu chuyện Coolmate
								</Link>
							</li>
							<li>
								<Link to='/page/coolxprint' className='text-sm text-gray-400 hover:text-white'>
									CoolXPrint
								</Link>
							</li>
							<li>
								<Link to='/page/tuyen-dung' className='text-sm text-gray-400 hover:text-white'>
									Tuyển dụng
								</Link>
							</li>
							<li>
								<Link to='/page/lien-he' className='text-sm text-gray-400 hover:text-white'>
									Liên hệ
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Contact information */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700 pt-8'>
					<div>
						<h4 className='font-medium mb-3'>CÔNG TY TNHH FASTECH ASIA</h4>
						<p className='text-sm text-gray-400 mb-2'>Mã số thuế: 0108617038</p>
						<p className='text-sm text-gray-400 mb-2'>
							Địa chỉ: 298 Đ. Tây Sơn, Ngã Tư Sở, Đống Đa, Hà Nội
						</p>
					</div>

					<div>
						<h4 className='font-medium mb-3'>LIÊN HỆ</h4>
						<div className='flex items-center mb-3'>
							<FiPhone className='mr-2 text-gray-400' />
							<p className='text-sm text-gray-400'>Hotline: 1900.27.27.37 (08h30 - 22h00)</p>
						</div>
						<div className='flex items-center'>
							<FiMail className='mr-2 text-gray-400' />
							<p className='text-sm text-gray-400'>Email: Cool@coolmate.me</p>
						</div>
					</div>

					<div>
						<h4 className='font-medium mb-3'>THEO DÕI COOLMATE</h4>
						<div className='flex space-x-3'>
							<Link
								to='https://www.facebook.com/coolmate.me'
								target='_blank'
								className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600'
							>
								<FiInstagram size={18} />
							</Link>
							<Link
								to='https://www.instagram.com/coolmate.me'
								target='_blank'
								className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600'
							>
								<FiInstagram size={18} />
							</Link>
							<Link
								to='https://www.youtube.com/c/Coolmate'
								target='_blank'
								className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600'
							>
								<FiYoutube size={18} />
							</Link>
						</div>
						<div className='mt-4'>
							<img
								src='https://ext.same-assets.com/916749146/3624480322.webp'
								alt='Chứng nhận'
								width={150}
								height={50}
							/>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className='text-center text-gray-500 text-xs mt-8'>
					<p>© {new Date().getFullYear()} Coolmate.me - Bản quyền thuộc về Công ty TNHH Fastech Asia</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
