// 'use client';
// import React from 'react';
// import Slider from 'react-slick';
// import ProductCard from './ProductCard';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import bg from '@/public/omsritara-new-arrivalas-bg.png';
// import { useProducts } from '@/context/ProductsContext';
// import { useRouter } from 'next/navigation';
// import { useCartItem } from '@/context/CartItemContext';
// import { useWishList } from '@/context/WishListContext';
// import ProductCardSkeleton from './ProductCardSkeleton';

// const sliderSettings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   pauseOnHover: false,
//   cssEase: 'linear',
//   responsive: [
//     { breakpoint: 1024, settings: { slidesToShow: 3 } },
//     { breakpoint: 768, settings: { slidesToShow: 2 } },
//     { breakpoint: 640, settings: { slidesToShow: 2 } },
//   ],
// };

// const NewArrivals: React.FC = () => {
//   const { products, isLoading }: any = useProducts();
//   const { wishList }: any = useWishList();
//   const { cartItem }: any = useCartItem();
//   const router = useRouter();

//   const mergedProductData = React.useMemo(() => {
//     if (!products?.data) return [];

//     // Filter products by status
//     const activeProducts = products.data.filter((product: any) =>
//       product.status === true ||
//       product.status === 1 ||
//       product.status === '1' ||
//       product.status === 'true' ||
//       product.status === 'TRUE' ||
//       product.status === 'active' ||
//       product.status === 'ACTIVE'
//     );

//     // Merge cart info
//     const withCartInfo = activeProducts.map((product: any, idx: number) => {
//       const matchCart = cartItem?.data?.find(
//         (ci: any) => ci.product === product.id
//       );
//       return matchCart
//         ? {
//           ...product,
//           Aid: idx,
//           cartQty: matchCart.quantity,
//           cartId: matchCart.id,
//         }
//         : product;
//     });

//     // Merge wishlist info
//     return withCartInfo.map((prod: any) => {
//       const wish = wishList?.data?.find((w: any) => w.product === prod.id);
//       return {
//         ...prod,
//         isLike: !!wish,
//         wishListId: wish?.id,
//       };
//     });
//   }, [products, cartItem, wishList]);


//   const sortedProductData = React.useMemo(() => {
//     // Prefer created_at/updated_at if you have it; fallback to id
//     return [...mergedProductData].sort((a, b) => {
//       if (a.created_at && b.created_at) {
//         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//       }
//       return Number(b.id) - Number(a.id);
//     });
//   }, [mergedProductData]);

//   function slugConvert(name: string) {
//     return name
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, '-')         // Replace spaces with hyphens
//       .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
//   }

//   return (
//     <section
//       className="py-2 mt-20"
//       style={{
//         backgroundImage: `url(${bg.src})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="container mx-auto md:px-4 max-w-7xl">
//         <h2 className="text-4xl font-semibold text-center mb-6">
//           New Arrivals
//         </h2>

//         <Slider {...sliderSettings}>
//           {isLoading
//             ? Array.from({ length: 5 }).map((_, idx) => (
//               <div key={idx} className="px-2">
//                 <ProductCardSkeleton />
//               </div>
//             ))
//             : sortedProductData.map((product: any, idx: any) => (
//               <div key={idx} className="px-2">
//                 <ProductCard
//                   image={product.image_urls[0] || ''}
//                   hoverImage={product.image_urls[1] || ''}
//                   title={product.name}
//                   price={product.price}
//                   onAddToCart={() => alert(`Add to cart: ${product.name}`)}
//                   onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
//                   onWishlist={() => alert(`Wishlist: ${product.name}`)}
//                   product={product}
//                 />
//               </div>
//             ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;



'use client';
import React, { useMemo } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bg from '@/public/omsritara-new-arrivalas-bg.png';
import { useProducts } from '@/context/ProductsContext';
import { useRouter } from 'next/navigation';
import { useCartItem } from '@/context/CartItemContext';
import { useWishList } from '@/context/WishListContext';

const baseSliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  cssEase: 'ease-in-out',
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const NewArrivals: React.FC = () => {
  const { products, isLoading }: any = useProducts();
  const { wishList }: any = useWishList();
  const { cartItem }: any = useCartItem();
  const router = useRouter();

  // 🧩 Merge product + cart + wishlist data
  const mergedProductData = useMemo(() => {
    if (!products?.data) return [];

    const activeProducts = products.data.filter((product: any) =>
      ['true', 'TRUE', '1', 1, true, 'active', 'ACTIVE'].includes(
        String(product.status).trim()
      )
    );

    const withCart = activeProducts.map((product: any, idx: number) => {
      const matchCart = cartItem?.data?.find(
        (ci: any) => ci?.product === product?.id
      );
      return matchCart
        ? { ...product, Aid: idx, cartQty: matchCart.quantity, cartId: matchCart.id }
        : product;
    });

    return withCart.map((p: any) => {
      const wish = wishList?.data?.find((w: any) => w.product === p.id);
      return { ...p, isLike: !!wish, wishListId: wish?.id };
    });
  }, [products, cartItem, wishList]);

  // 🧩 Sort newest first
  const sortedProductData = useMemo(() => {
    return [...mergedProductData].sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bDate - aDate;
    });
  }, [mergedProductData]);

  // 🧩 Adjust slider dynamically based on available products
  const sliderSettings = useMemo(() => {
    const totalProducts = sortedProductData.length;
    const showCount = Math.min(totalProducts, 5);

    return {
      ...baseSliderSettings,
      infinite: totalProducts > showCount,
      autoplay: totalProducts > showCount,
      slidesToShow: showCount,
      responsive: baseSliderSettings.responsive.map((bp) => ({
        ...bp,
        settings: {
          ...bp.settings,
          slidesToShow: Math.min(totalProducts, bp.settings.slidesToShow),
        },
      })),
    };
  }, [sortedProductData]);

  const slugConvert = (name: string) =>
    name?.toLowerCase()?.trim()?.replace(/\s+/g, '-')?.replace(/[^\w-]+/g, '');

  return (
    <section
      className="py-12 mt-12 relative"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#fffef9',
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-gray-800">
          New Arrivals
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : sortedProductData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No new arrivals available at the moment.
          </p>
        ) : sortedProductData.length <= 2 ? (
          // 🧩 If 1 or 2 products, show simple grid instead of slider
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
            {sortedProductData.map((product: any, idx: number) => (
              <ProductCard
                key={idx}
                image={product?.image_urls?.[0] || '/placeholder.png'}
                hoverImage={product?.image_urls?.[1] || product?.image_urls?.[0]}
                title={product?.name}
                price={product?.price}
                onAddToCart={() => alert(`Add to cart: ${product?.name}`)}
                onView={() =>
                  router.push(`/shop/${slugConvert(product?.name)}`)
                }
                onWishlist={() => alert(`Wishlist: ${product?.name}`)}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {/* <Slider {...sliderSettings}> */}
              {sortedProductData.map((product: any, idx: number) => (
                // <div key={idx} className="px-2">
                  // <div className="flex justify-center">
                    <ProductCard
                      image={product?.image_urls?.[0] || '/placeholder.png'}
                      hoverImage={product?.image_urls?.[1] || product?.image_urls?.[0]}
                      title={product?.name}
                      price={product?.price}
                      onAddToCart={() => alert(`Add to cart: ${product?.name}`)}
                      onView={() =>
                        router.push(`/shop/${slugConvert(product?.name)}`)
                      }
                      onWishlist={() => alert(`Wishlist: ${product?.name}`)}
                      product={product}
                    />
                  // </div>
                // </div>
              ))}
            {/* </Slider> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
