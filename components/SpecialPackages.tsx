'use client';
import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useProducts } from '@/context/ProductsContext';
import { useRouter } from 'next/router';
import { useCartItem } from '@/context/CartItemContext';
import { useWishList } from '@/context/WishListContext';
import ProductCardSkeleton from './ProductCardSkeleton';


const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    cssEase: 'linear',

    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
};


const Bracelets: React.FC = () => {

    const { products, isAuthenticated, isLoading }: any = useProducts();
    const { wishList, wishListLoading }: any = useWishList();


    const router = useRouter();
    const { cartItem }: any = useCartItem();

    // const matchingProductsArray = products?.data?.map((product: any, index: number) => {
    //     const matchingCartItem = cartItem?.data?.find(
    //         (item: any) => item?.product === product?.id
    //     );

    //     if (matchingCartItem) {
    //         return {
    //             ...product,
    //             Aid: index,
    //             cartQty: matchingCartItem?.quantity,
    //             cartId: matchingCartItem.id,
    //         };
    //     }
    //     return product;
    // });


    // const finalProductData = matchingProductsArray?.map((item: any) => {
    //     const wishLists = wishList?.data?.find(
    //         (wish: any) => wish?.product === item?.id
    //     );
    //     return {
    //         ...item,
    //         isLike: wishLists ? true : false,
    //         wishListId: wishLists?.id
    //     };
    // });

    // Filter products with status true
    const activeProducts = products?.data?.filter((product: any) =>
        product.status === true ||
        product.status === 1 ||
        product.status === '1' ||
        product.status === 'true' ||
        product.status === 'TRUE' ||
        product.status === 'active' ||
        product.status === 'ACTIVE'
    );

    // Merge cart info
    const matchingProductsArray = activeProducts?.map((product: any, index: number) => {
        const matchingCartItem = cartItem?.data?.find(
            (item: any) => item?.product === product?.id
        );

        if (matchingCartItem) {
            return {
                ...product,
                Aid: index,
                cartQty: matchingCartItem?.quantity,
                cartId: matchingCartItem.id,
            };
        }
        return product;
    });

    // Merge wishlist info
    const finalProductData = matchingProductsArray?.map((item: any) => {
        const wishLists = wishList?.data?.find(
            (wish: any) => wish?.product === item?.id
        );
        return {
            ...item,
            isLike: !!wishLists,
            wishListId: wishLists?.id
        };
    });

    const braceletId = "204";
    const pendulumsId = "290";

    const braceletsData = finalProductData?.filter(
        (product: any) => product.category?.toString() === braceletId
    );

    const pendulumsData = finalProductData?.filter(
        (product: any) => product.category?.toString() === pendulumsId
    );

    function slugConvert(name: string) {
        return name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')         // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
    }

    return (
        <section className="pt-5">
            <div className="container mx-auto md:px-4 max-w-7xl">
                <h2 className="text-4xl font-semibold text-center  mb-8">Bracelets</h2>
                <Slider {...sliderSettings}>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="px-2">
                                <ProductCardSkeleton />
                            </div>
                        ))
                        : braceletsData?.slice(0, 8)?.map((product: any, idx: any) => (
                            <div key={idx} className="px-2">
                                <ProductCard
                                    image={product.image_urls[0] || ''}
                                    hoverImage={product.image_urls[1] || ''}
                                    title={product.name}
                                    price={product.price}
                                    onAddToCart={() => alert(`Add to cart: ${product.name}`)}
                                    onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
                                    onWishlist={() => alert(`Wishlist: ${product.name}`)}
                                    product={product}
                                />
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-4xl font-semibold text-center mt-6 mb-8">Pendulums</h2>
                <Slider {...sliderSettings}>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="px-2">
                                <ProductCardSkeleton />
                            </div>
                        ))
                        : pendulumsData?.slice(0, 8)?.map((product: any, idx: any) => (
                            <div key={idx} className="px-2">
                                <ProductCard
                                    image={product.image_urls[0] || ''}
                                    hoverImage={product.image_urls[1] || ''}
                                    title={product.name}
                                    price={product.price}
                                    onAddToCart={() => alert(`Add to cart: ${product.name}`)}
                                    onView={() => router.push(`/shop/${slugConvert(product?.name)}`)}
                                    onWishlist={() => alert(`Wishlist: ${product.name}`)}
                                    product={product}
                                />
                            </div>
                        ))}
                </Slider>
            </div>
        </section>
    );
};

export default Bracelets;
