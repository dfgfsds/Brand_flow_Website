import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import Certificates from "@/components/Certificates";
import FeaturedCategories from "@/components/FeaturedCategories";
import HeroSection from "@/components/HeroSection";
import NewArrivals from "@/components/NewArrivals";
import Bracelets from "@/components/SpecialPackages";
import Testimonials from "@/components/Testimonials";
import { baseUrl } from "@/api-endpoints/ApiUrls";
import axios from "axios";
import SpecialSection from "@/components/SpecialSection";

export default function Home({ blogs }: { blogs: any[] }) {

  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals />
      {/* <Bracelets /> */}
      <AboutSection />
      <BlogSection blogs={blogs} />
      <SpecialSection/>
      {/* <Certificates /> */}
      <Testimonials />
    </div>
  );
}

// ✅ Server-Side Rendering
export async function getServerSideProps() {
  try {
    const vendorId = 144;
    const blogAPI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/?vendor_id=${vendorId}`;
    const res = await axios.get(blogAPI);

    return {
      props: {
        blogs: res.data?.blogs || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        blogs: [],
      },
    };
  }
}
