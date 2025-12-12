// 'use client';
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { baseUrl } from '@/api-endpoints/ApiUrls';
// import { useVendor } from '@/context/VendorContext';

// export default function HeroSection() {
//   const router = useRouter();
//   const { vendorId } = useVendor();
//   const [banners, setBanners] = useState<any[]>([]);
//   const [isMobile, setIsMobile] = useState<boolean | null>(null);
// console.log(vendorId)
//   // Fetch banners
//   const bannerGetApi = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/banners/?vendorId=${vendorId}`);
//       if (res.data?.banners) {
//         setBanners(res.data.banners);
//       } else {
//         console.warn('Unexpected API response:', res.data);
//       }
//     } catch (error) {
//       console.log('Error fetching banners:', error);
//     }
//   };

//   useEffect(() => {
//     bannerGetApi();
//   }, [vendorId]);

//   // Detect mobile view
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   if (isMobile === null) return null;

//   // Filter banners based on type
//   const filteredBanners = banners.filter(banner =>
//     isMobile ? banner.type === 'Mobile View' : banner.type === 'Web View'
//   );

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     autoplay: false,
//     autoplaySpeed: 3000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     pauseOnHover: false,
//     appendDots: (dots: React.ReactNode) => (
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <ul className="flex justify-center space-x-2">{dots}</ul>
//       </div>
//     ),
//     customPaging: () => (
//       <div className="dot w-2 h-2 bg-gray-300 rounded-full transition-all duration-300" />
//     ),
//   };

//   const handleBannerClick = (banner: any) => {
//     if (banner?.target_url) {
//       router.push(banner.target_url); // Always open in same tab
//     }
//   };

//   return (
//     <div className="z-10 md:h-[70vh] rounded-lg md:px-10 md:py-4">
//       <Slider {...settings}>
//         {filteredBanners.map((banner, index) => (
//           <div
//             key={banner.id}
//             onClick={() => handleBannerClick(banner)}
//             className="cursor-pointer"
//           >
//             <img
//               className="md:rounded-lg md:object-cover w-full h-[70vh] md:h-auto"
//               src={banner.image_url}
//               alt={banner.title || 'banner'}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useVendor } from '@/context/VendorContext';
import { baseUrl } from '@/api-endpoints/ApiUrls';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<any>(null);
  const { vendorId } = useVendor();
  const [banners, setBanners] = useState<any[]>([]);
  const router = useRouter();

  // ✅ Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // ✅ Fetch banners safely
  const bannerGetApi = async () => {
    try {
      // if (!vendorId) {
      //   console.warn('⏳ vendorId not available yet, skipping banner fetch');
      //   return;
      // }

      const res = await axios.get(`${baseUrl}/banners/?vendorId=${vendorId}`);
      if (res.data?.banners && Array.isArray(res.data.banners)) {
        setBanners(res.data.banners);
      } else {
        // console.warn('⚠️ Unexpected banner API response:', res.data);
      }
    } catch (error) {
      // console.error('❌ Error fetching banners:', error);
    }
  };

  useEffect(() => {
    if(vendorId){
    bannerGetApi();
    }
  }, [vendorId]);

  // ✅ Handle mobile/web banners
  const filteredBanners = banners.filter((banner) =>
    isMobile ? banner.type === 'Mobile View' : banner.type === 'Web View'
  );

  const handleBannerClick = (banner: any) => {
    if (banner?.target_url) {
      router.push(banner.target_url);
    }
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      filteredBanners?.length > 2 && (
        <div
          onClick={onClick}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full cursor-pointer hover:bg-white shadow-md"
        >
          <ChevronRight className="text--green-900 w-5 h-5" />
        </div>
      )
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      filteredBanners?.length > 2 && (
        <div
          onClick={onClick}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full cursor-pointer hover:bg-white shadow-md"
        >
          <ChevronLeft className="text--green-900 w-5 h-5" />
        </div>
      )
    );
  };

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => {
      const slides = document.querySelectorAll('.slick-slide .zoom-slide');
      slides.forEach((slide) => slide.classList.remove('scale-100'));
      setTimeout(() => {
        const active = document.querySelector('.slick-active .zoom-slide');
        if (active) active.classList.add('scale-100');
      }, 100);
    },
  };

  useEffect(() => {
    if (vendorId) bannerGetApi();
  }, [vendorId]);


  if (!filteredBanners?.length) {
    return (
      <div className="relative h-[70vh] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No banners available</p>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] md:h-[70vh] overflow-hidden hero-container">
      <Slider ref={sliderRef} {...sliderSettings}>
        {filteredBanners.map((banner: any) => (
          <div
            key={banner?.id}
            className="cursor-pointer"
            onClick={() => handleBannerClick(banner)}
          >
            {/* {banner?.image_url ? (
              <img
                className="md:rounded-lg md:object-cover w-full h-[70vh] md:h-auto"
                src={banner.image_url}
                alt={banner?.title || 'banner'}
              />
            ) : (
              <div className="bg-gray-200 w-full h-[70vh]" /> // fallback
            )} */}
            <Image
              src={banner.image_url}
              alt={banner.title || "Banner"}
              width={2000}
              height={800}
              className="md:rounded-lg md:object-cover w-full h-[70vh] md:h-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

