import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FiChevronDown, FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<header className='bg-white shadow-sm sticky top-0 z-50'>
			{/* Top announcement bar */}
			<div className='bg-[#171822] text-white py-1 text-center text-xs'>
				<p>Tặng 50k CoolCash + Voucher 15% cho thành viên CoolClub mới!</p>
			</div>

			{/* Main navbar */}
			<div className='container-coolmate py-3'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<Link to='/' className='flex-shrink-0'>
						<img src='/images/logo.png' alt='Coolmate' width={120} height={30} />
					</Link>

					{/* Main Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='header-link flex items-center'>
									NAM <FiChevronDown className='ml-1' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='start' className='w-56'>
								<DropdownMenuItem>
									<Link to='/collection/ao-nam' className='w-full'>
										Áo Nam
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to='/collection/quan-nam' className='w-full'>
										Quần Nam
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to='/collection/quan-lot-nam' className='w-full'>
										Quần Lót Nam
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to='/collection/phu-kien-nam' className='w-full'>
										Phụ Kiện
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='header-link flex items-center'>
									NỮ <FiChevronDown className='ml-1' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='start' className='w-56'>
								<DropdownMenuItem>
									<Link to='/collection/ao-nu' className='w-full'>
										Áo Nữ
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to='/collection/quan-nu' className='w-full'>
										Quần Nữ
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to='/collection/phu-kien-nu' className='w-full'>
										Phụ Kiện
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='header-link flex items-center'>
									THỂ THAO <FiChevronDown className='ml-1' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='start' className='w-56'>
								<DropdownMenuItem>
									<Link to='/collection/the-thao-nam' className='w-full'>
										Thể Thao Nam
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to='/collection/the-thao-nu' className='w-full'>
										Thể Thao Nữ
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Link to='/collection/care-and-share' className='header-link'>
							CARE & SHARE
						</Link>
					</nav>

					{/* Right Navigation */}
					<div className='flex items-center space-x-4'>
						<div className='hidden md:flex items-center relative'>
							<Input
								type='search'
								placeholder='Tìm kiếm...'
								className='rounded-full bg-gray-100 border-0 pl-10 pr-4 w-40 focus-visible:ring-primary h-9'
							/>
							<FiSearch className='absolute left-3 text-gray-500' />
						</div>

						<Button variant='ghost' size='icon' className='relative' asChild>
							<Link to='/account'>
								<FiUser size={20} />
							</Link>
						</Button>

						<Button variant='ghost' size='icon' className='relative' asChild>
							<Link to='/cart'>
								<FiShoppingBag size={20} />
								<span className='absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
									0
								</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Secondary Navigation - Categories */}
			<div className='border-t border-gray-200 py-2 hidden md:block'>
				<div className='container-coolmate'>
					<div className='flex items-center justify-center space-x-4'>
						<Link
							to='/collection/ao-thun-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Áo thun
						</Link>
						<Link
							to='/collection/ao-so-mi-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Sơ mi
						</Link>
						<Link
							to='/collection/ao-khoac-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Áo khoác
						</Link>
						<Link
							to='/collection/quan-dai-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Quần dài
						</Link>
						<Link
							to='/collection/quan-short-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Quần short
						</Link>
						<Link
							to='/collection/quan-lot-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Quần lót
						</Link>
						<Link
							to='/collection/phu-kien-nam'
							className='text-xs uppercase text-gray-600 hover:text-primary'
						>
							Phụ kiện
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
