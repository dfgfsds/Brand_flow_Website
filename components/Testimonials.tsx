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
        if (vendorId) {
        reviewsGetApi();
        }
    }, [vendorId]);
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {reviews?.length > 0 && (
                    <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
                )}

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
                                            className="text-yellow-500 fill-yellow-500"
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
                                                className="text-yellow-500 fill-yellow-500"
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