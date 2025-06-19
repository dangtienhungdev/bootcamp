import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Chào mừng đến với CRUD App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ứng dụng quản lý sản phẩm với React Query
        </p>
        <Link to="/products">
          <Button size="lg" className="px-8 py-3">
            Xem danh sách sản phẩm
          </Button>
        </Link>
      </div>
    </div>
  );
}