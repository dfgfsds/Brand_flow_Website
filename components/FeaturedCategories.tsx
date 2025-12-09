// 'use client';
// import Slider from 'react-slick';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useCategories } from '@/context/CategoriesContext';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { slugConvert } from '@/lib/utils';

// const SampleNextArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div className="ml-2 p-2 rounded-full bg-white shadow cursor-pointer hover:bg-[#991b1b] hover:text-white" onClick={onClick}>
//     <ChevronRight size={20} />
//   </div>
// );

// const SamplePrevArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div className="p-2 rounded-full bg-white shadow cursor-pointer hover:bg-[#991b1b] hover:text-white" onClick={onClick}>
//     <ChevronLeft size={20} />
//   </div>
// );

// const FeaturedCategories = () => {
//   let sliderRef: Slider | null = null;
//   const { categories, isLoading } = useCategories();
//   const router = useRouter();

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     cssEase: 'ease-in-out',
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     arrows: true,
//     responsive: [
//       { breakpoint: 1280, settings: { slidesToShow: 6 } },
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//     ],
//   };

//   // Placeholder for loading
//   const skeletonItems = new Array(6).fill(null);

//   return (
//     <section className="mt-12">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="relative grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-6">
//           <div className="text-center col-span-1 md:col-start-2">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-black">
//               Top Categories
//             </h2>
//           </div>

//           <div className="flex mt-4 flex-col items-center md:items-end justify-center md:justify-end col-span-1 md:col-start-3">
//             <Link
//               href="/categories"
//               onClick={() => router.push('/categories')}
//               className="text-sm text-gray-600 hover:underline mt-1 mr-4"
//             >
//               View All
//             </Link>
//           </div>
//         </div>

//         <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
//           {isLoading
//             ? skeletonItems.map((_, index) => (
//               <div key={index} className="px-4">
//                 <div className="flex flex-col items-center text-center animate-pulse">
//                   <div className="w-40 h-40 bg-gray-200 rounded-full" />
//                   <div className="mt-4 w-24 h-4 bg-gray-200 rounded" />
//                 </div>
//               </div>
//             ))
//             : categories?.data?.map((category, index) => (
//               <div key={index} className="px-4">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-40 h-40 overflow-hidden rounded-full shadow-md">
//                     <Image
//                       src={category.image}
//                       alt={category.title}
//                       width={160} // same as w-40
//                       height={160} // same as h-40
//                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                     />
//                   </div>
//                   <div className="mt-4 flex items-center justify-center w-full px-2">
//                     <h3
//                       onClick={() => router.push(`/categories/${slugConvert(category?.name)}`)}
//                       className="text-lg font-semibold cursor-pointer"
//                     >
//                       {category.name}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCategories;

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
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black text-center w-full md:w-auto">
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
                <div key={index} className="px-4">
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
                        onClick={() => router.push(`/categories/${slugConvert(category?.name)}`)}
                        className="text-lg font-semibold cursor-pointer hover:text-blue-900"
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
