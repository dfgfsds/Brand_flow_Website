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

const testimonials = [
    {
        name: "Aarav Sharma",
        review:
            "The bracelet I ordered was beautiful and exactly as shown. Packaging was also premium. Very happy with the purchase!",
        rating: 5,
    },
    {
        name: "Priya Verma",
        review:
            "Loved the pendant I bought! The quality is excellent and delivery was super fast. Great customer service too.",
        rating: 5,
    },
    {
        name: "Rohan Mehta",
        review:
            "I ordered a decorative statue for my living room. It looks amazing and added a positive vibe to my home.",
        rating: 4,
    },
    {
        name: "Ananya Gupta",
        review:
            "Beautiful collection of spiritual items. I purchased a bracelet and a card set—both exceeded my expectations.",
        rating: 5,
    },
    {
        name: "Vikram Iyer",
        review:
            "Good value for money. The pendant I received was well-crafted and delivered on time.",
        rating: 4,
    },
    {
        name: "Sneha Reddy",
        review:
            "I am absolutely in love with their designs! The bracelet I ordered is now my daily wear. Highly recommend this store.",
        rating: 5,
    },
];

const Testimonials = () => {
    const { vendorId } = useVendor();
    const [reviews, setReviews] = useState<any[]>([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // tablet
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const reviewsGetApi = async () => {
        try {
            const res = await axios.get(`${baseUrl}/testimonial/?vendor_id=${vendorId}`);
            console.log(res)
            if (res?.data) {
                const reviewsWithImages = res?.data?.testimonials?.map((review: any, index: any) => ({
                    ...review,
                    stars: Math.floor(Math.random() * 3) + 3,
                }));
                setReviews(reviewsWithImages);
            } else {
                console.warn('Unexpected API response:', res.data);
            }
        } catch (error) {
            console.log('Error fetching banners:', error);
        }
    };

    useEffect(() => {
        reviewsGetApi();
    }, [vendorId]);
    console.log(reviews);
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                    {/* <Image
                        src="/google-logo.png"
                        alt="Google"
                        width={40}
                        height={40}
                    /> */}
                    <h2 className="text-2xl font-bold text-blue-900">What Our Customers Say</h2>
                </div>

                <Slider {...settings}>
                    {reviews?.map((t, i) => (
                        <div key={i} className="px-3">
                            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: t?.rating }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className="text-yellow-500 fill-yellow-500"
                                            size={18}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic">"{t?.description}"</p>
                                <p className="font-semibold text-gray-800">- {t?.title}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;
