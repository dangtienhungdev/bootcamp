/*
{
  "docs": [
    {
      "_id": "686fe457cd3d7cd2f164004b",
      "name": "Quần Ống Rộng Kẻ Sọc Chất Liệu Đũi Xốp Siêu Mềm Mát Lên Form Xinh updated",
      "description": "<li><strong>OTIS CLUB</strong> sẽ giúp bạn giải quyết vấn đề giá thành, chất lượng và mẫu mã sản phẩm tốt nhất.</li>",
      "price": 200000,
      "discountPrice": 0,
      "category": {
        "_id": "67d5c818ab5ab468f2887259",
        "name": "Tất cả sản phẩm",
        "slug": "tat-ca-san-pham"
      },
      "variants": [
        {
          "color": "Đỏ",
          "sizes": [
            {
              "size": "S",
              "quantity": 10,
              "price": 0,
              "_id": "68712ba3e735d86a8abdf9d2"
            },
            {
              "size": "M",
              "quantity": 5,
              "price": 0,
              "_id": "68712ba3e735d86a8abdf9d3"
            },
            {
              "size": "L",
              "quantity": 0,
              "price": 0,
              "_id": "68712ba3e735d86a8abdf9d4"
            }
          ],
          "_id": "68712ba3e735d86a8abdf9d1"
        },
        {
          "color": "Xanh",
          "sizes": [
            {
              "size": "S",
              "quantity": 8,
              "price": 0,
              "_id": "68712ba3e735d86a8abdf9d6"
            },
            {
              "size": "M",
              "quantity": 3,
              "price": 0,
              "_id": "68712ba3e735d86a8abdf9d7"
            },
            {
              "size": "L",
              "quantity": 2,
              "price": 0,
              "_id": "68712ba3e735d86a8abdf9d8"
            }
          ],
          "_id": "68712ba3e735d86a8abdf9d5"
        }
      ],
      "isActive": false,
      "isDeleted": false,
      "thumbnail": "https://res.cloudinary.com/dcwdrvxdg/image/upload/v1752851418/vlsm-shop/uxw3p3vnhqastemmo17c.webp",
      "images": [
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m08bd35uer9r4f.webp",
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m08bd35udcdp0b.webp"
      ],
      "createdAt": "2025-07-10T16:03:35.866Z",
      "updatedAt": "2025-07-11T15:20:03.007Z",
      "slug": "san-pham-6"
    },
  ],
  "totalDocs": 4,
  "limit": 10,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
*/

import type { CategoryRefProduct } from './category.type'

export type VarianSize = {
  size: string
  quantity: number
  price: number
  _id: string
}

export type Variant = {
  _id: string
  sizes: VarianSize[]
  color: string
}

export type Product = {
  _id: string
  name: string
  description: string
  price: number
  discountPrice: number
  category: CategoryRefProduct
  variants: Variant[]
  isActive: boolean
  isDeleted: boolean
  thumbnail: string
  images: string[]
  createdAt: string
  updatedAt: string
  slug: string
}
