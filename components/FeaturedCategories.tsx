
'use client'

import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import { useCategories } from '@/context/CategoriesContext'
import { useRouter } from 'next/router'
import { slugConvert } from '@/lib/utils'

// ✅ make sure these are in _app.tsx globally too
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const FeaturedCategories = () => {
  const { categories, isLoading } = useCategories()
  const router = useRouter()

  const categoryList = categories?.data || []

  const settings = {
    dots: false,
    infinite: categoryList.length > 1,
    speed: 600,
    slidesToShow: Math.min(6, categoryList.length || 1),
    slidesToScroll: 2,
    arrows: false, // ✅ removed arrows completely
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  }

  const skeletonItems = new Array(6).fill(null)

  return (
    <section className="mt-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ---- Header ---- */}
        <div className="flex  items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black text-center mx-auto w-full md:w-auto">
            Top Categories
          </h2>

          <Link
            href="/categories"
            className="text-sm text-gray-600 hover:underline mt-2 md:mt-0"
          >
            View All
          </Link>
        </div>

        {/* ---- Slider Section ---- */}
        <div className="w-full overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center gap-6">
              {skeletonItems.map((_, index) => (
                <div key={index} className="flex flex-col items-center text-center animate-pulse">
                  <div className="w-40 h-40 bg-gray-200 rounded-full" />
                  <div className="mt-4 w-24 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : categoryList.length > 0 ? (
            <Slider {...settings}>
              {categoryList.map((category: any, index: number) => (
                <div key={index} className="px-4"
                  onClick={() => router.push(`/categories/${(category?.slug_name)}`)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full shadow-md">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <h3
                        onClick={() => router.push(`/categories/${(category?.slug_name)}`)}
                        className="text-lg font-semibold cursor-pointer hover:text-[#991b1b]"
                      >
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center text-gray-500 py-8">No categories available</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
