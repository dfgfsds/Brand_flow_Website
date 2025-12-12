// components/Testimonials.tsx
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useVendor } from "@/context/VendorContext";
import axios from "axios";
import { baseUrl } from "@/api-endpoints/ApiUrls";

// const Testimonials = () => {
//     const { vendorId } = useVendor();
//     const [reviews, setReviews] = useState<any[]>([]);
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 800,
//         slidesToShow: 3,
//         slidesToScroll: 2,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         responsive: [
//             {
//                 breakpoint: 1024, // tablet
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 640, // mobile
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     };

//     const reviewsGetApi = async () => {
//         try {
//             const res = await axios.get(`${baseUrl}/testimonial/?vendor_id=${vendorId}`);
//             console.log(res)
//             if (res?.data) {
//                 const reviewsWithImages = res?.data?.testimonials?.map((review: any, index: any) => ({
//                     ...review,
//                     stars: Math.floor(Math.random() * 3) + 3,
//                 }));
//                 setReviews(reviewsWithImages);
//             } else {
//                 console.warn('Unexpected API response:', res.data);
//             }
//         } catch (error) {
//             console.log('Error fetching banners:', error);
//         }
//     };

//     useEffect(() => {
//         reviewsGetApi();
//     }, [vendorId]);
//     console.log(reviews);
//     return (
//         <section className="py-12 bg-gray-50">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="flex items-center gap-3 mb-6">
//                     <h2 className="text-2xl font-bold">What Our Customers Say</h2>
//                 </div>

//                 <Slider {...settings}>
//                     {reviews?.slice(0,1)
//                         .filter((review: any) => review?.verified_status === true) // ✅ show only verified
//                         .map((review, idx) => (
//                             <div key={idx} className="px-3">
//                                 <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
//                                     <div className="flex items-center gap-2">
//                                         {Array.from({ length: review?.rating }).map((_, idx) => (
//                                             <Star
//                                                 key={idx}
//                                                 className="text-blue-900 fill-blue-500"
//                                                 size={18}
//                                             />
//                                         ))}
//                                     </div>
//                                     <p className="text-gray-600 italic">"{review?.description}"</p>
//                                     <p className="font-semibold text-gray-800">- {review?.title}</p>
//                                 </div>
//                             </div>
//                         ))}
//                 </Slider>
//             </div>
//         </section>
//     );
// };

// export default Testimonials;


const Testimonials = () => {
    const { vendorId } = useVendor();
    const [reviews, setReviews] = useState<any[]>([]);

    const settings = {
        dots: true,
        infinite: reviews.length > 1,   // ⭐ only loop if more than 1 review
        speed: 800,
        slidesToShow: reviews.length < 3 ? reviews.length : 3, // ⭐ auto adjust
        slidesToScroll: 1,
        autoplay: reviews.length > 1, // ⭐ autoplay only if multiple
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: reviews.length < 2 ? reviews.length : 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const reviewsGetApi = async () => {
        try {
            const res = await axios.get(`${baseUrl}/testimonial/?vendor_id=${vendorId}`);

            if (res?.data) {
                const filtered = res.data.testimonials.filter(
                    (r: any) => r.verified_status === true
                );

                const reviewsWithStars = filtered.map((review: any) => ({
                    ...review,
                    stars: Math.floor(Math.random() * 3) + 3,
                }));

                setReviews(reviewsWithStars);
            }
        } catch (error) {
            console.log('Error fetching testimonials:', error);
        }
    };

    useEffect(() => {
        reviewsGetApi();
    }, [vendorId]);

    // return (
    //     <section className="py-12 bg-gray-50">
    //         <div className="max-w-6xl mx-auto px-4">
    //             <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>

    //             <Slider {...settings}>
    //                 {reviews?.slice(0,1)?.map((review: any, idx: number) => (
    //                     <div key={idx} className="px-3">
    //                         <div className="bg-white rounded-xl shadow p-6">
    //                             <div className="flex items-center gap-2 mb-3">
    //                                 {Array.from({ length: review?.stars }).map((_, i) => (
    //                                     <Star
    //                                         key={i}
    //                                         className="text-blue-900 fill-blue-500"
    //                                         size={18}
    //                                     />
    //                                 ))}
    //                             </div>

    //                             <p className="text-gray-600 italic">
    //                                 "{review?.description}"
    //                             </p>

    //                             <p className="font-semibold text-gray-800 mt-2">
    //                                 - {review?.title}
    //                             </p>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </Slider>
    //         </div>
    //     </section>
    // );

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>

                {reviews?.length > 0 && reviews?.length <= 3 && (
                    <div className="flex justify-center gap-6 flex-wrap">

                        {reviews?.map((review, idx) => (
                            <div
                                key={idx}
                                className={`
                    bg-white rounded-xl shadow p-6
                    ${reviews?.length === 1 ? "w-full md:w-1/3" : ""}
                    ${reviews?.length === 2 ? "w-full md:w-1/3" : ""}
                    ${reviews?.length === 3 ? "w-full md:w-1/4" : ""}
                `}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    {Array.from({ length: review?.stars }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="text-blue-900 fill-blue-500"
                                            size={18}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-600 italic">
                                    "{review?.description}"
                                </p>

                                <p className="font-semibold text-gray-800 mt-2">
                                    - {review?.title}
                                </p>
                            </div>
                        ))}

                    </div>
                )}


                {/* ⭐ More than 3 Reviews → SLIDER ENABLE */}
                {reviews.length > 3 && (
                    <Slider {...settings}>
                        {reviews.map((review, idx) => (
                            <div key={idx} className="px-3">
                                <div className="bg-white rounded-xl shadow p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        {Array.from({ length: review.stars }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="text-blue-900 fill-blue-500"
                                                size={18}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 italic">
                                        "{review.description}"
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-2">
                                        - {review.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </section>
    );

};

export default Testimonials;