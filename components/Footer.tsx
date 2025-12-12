'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useVendor } from '@/context/VendorContext';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { baseUrl } from '@/api-endpoints/ApiUrls';
import axios from 'axios';
import { useCategories } from '@/context/CategoriesContext';
import { useQuery } from '@tanstack/react-query';
import { getVendorDeliveryDetailsApi } from '@/api-endpoints/authendication';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ title: '', description: '' })
    const { vendorId } = useVendor();
    const [submitted, setSubmitted] = useState(false);
    const { user, setUser }: any = useUser();
    const router = useRouter();
    const [testimonialData, setTestimonialData] = useState<any>()
    const [getUserId, setUserId] = useState<string | null>(null);
    const { categories }: any = useCategories();

    const getVendorDeliveryDetailsData: any = useQuery({
        queryKey: ['getVendorDeliveryDetailsData', vendorId],
        queryFn: () => getVendorDeliveryDetailsApi(`${vendorId}`),
        enabled: !!vendorId
    })
    const socialMediaData = getVendorDeliveryDetailsData?.data?.data?.vendor_site_details?.social_media_icon;
    const data = getVendorDeliveryDetailsData?.data?.data?.vendor_other_details;

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    const handleFormChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post(`${baseUrl}/testimonial/`, { ...form, vendor: vendorId, verified_status: false, created_by: user?.data?.name ? user?.data?.name : 'user', user: getUserId })
            setSubmitted(true)
            setTimeout(() => {
                setIsModalOpen(false)
                setForm({ title: '', description: '' })
                setSubmitted(false)
            }, 1500)
        } catch (err) {
            console.error(err)
            alert('Error submitting testimonial')
        }
    }

    const testimonialGetApi = async () => {
        try {
            const res: any = await axios.get(`${baseUrl}/testimonial/?user_id=${user?.data?.id}&vendor_id=${vendorId}`);
            if (res?.data) {
                setTestimonialData(res?.data?.testimonials);
            } else {
                console.warn('Unexpected API response:', res.data);
            }
        } catch (error) {
            // console.log('Error fetching banners:', error);
        }
    };

    useEffect(() => {
        if (user?.data?.id) {
            testimonialGetApi();
        }
    }, [user?.data?.id]);

    return (
        <>
            {!testimonialData?.length && (
                <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">What Our Customers Say!</h2>
                        <p className="text-gray-600 mb-8">
                            We love to hear from our customers. Share your experience with us!
                        </p>

                        <button
                            onClick={() => {
                                getUserId ?
                                    setIsModalOpen(true)
                                    :
                                    router.push('/login');
                            }}
                            className="px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition mb-6"
                        >
                            Write a Testimonial
                        </button>
                    </div>
                </section>
            )}
            <footer className="bg-blue-900 text-white px-6 lg:px-20 py-12 text-sm">
                {/* <footer className="bg-[#222222] text-gray-400 px-6 lg:px-20 py-12 text-sm"> */}
                {/* Top Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* SHOP */}
                    <div>
                        <h3 className="font-semibold mb-4 uppercase">Shop</h3>
                        <ul className="space-y-2">
                            {categories?.data?.slice(0, 4)?.map((category: any) => (
                                <li key={category.id}>
                                    <Link href={`/categories/${category.slug}`} className="hover:text-white transition-colors">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            {/* <li><Link href="/categories/bracelet" className="hover:text-white transition-colors">Bracelet</Link></li>
                            <li><Link href="/categories/mala" className="hover:text-white transition-colors">Mala</Link></li>
                            <li><Link href="/categories/spiritual-statues" className="hover:text-white transition-colors">Spiritual Statues</Link></li>
                            <li><Link href="/categories/rings" className="hover:text-white transition-colors">Rings</Link></li> */}
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="font-semibold mb-4 uppercase">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/aboutUs" className="hover:text-white transition-colors"> Our Story</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors"> Blogs</Link></li>
                            <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                        </ul>
                    </div>

                    {/* NEED HELP */}
                    <div>
                        <h3 className="font-semibold mb-4 uppercase">Need Help?</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/profile" className="hover:text-white transition-colors">My Account</Link>
                            </li>
                            <li>
                                <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms And Conditions</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/cancellation-policy" className="hover:text-white transition-colors">Cancellation Policy</Link>
                            </li>
                            <li>
                                <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
                            </li>
                        </ul>
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="font-semibold mb-4 uppercase">Where to Contact Us</h3>
                        <ul className="space-y-2">
                            {data?.support_email && (
                                <li>
                                    <a href={`mailto:${data?.support_email}`} className="text-purple-700">{data?.support_email}</a>
                                </li>
                            )}
                            {data?.support_contact && (
                                <li>
                                    Ph No: <a href={`tel:${data?.support_contact}`} className="text-purple-700">{data?.support_contact}</a>
                                </li>
                            )}
                            <li>
                                <span className="block font-medium mt-2">ADDRESS:</span>
                                B&G<br />
                                No1. Nethahi Main Road,<br />
                                Bibikulam, Madurai,<br />
                                Tamil Nadu 625002
                            </li>
                        </ul>
                        <span className='flex gap-3 mt-2'>
                            {socialMediaData?.facebook?.url && socialMediaData?.facebook?.status === true && (
                                <a
                                    href={socialMediaData?.facebook?.url}
                                    target='_blank' className="bg-slate-100 p-2 hover:scale-110 transition-transform rounded-full text-[#000] ">
                                    <Facebook size={16} />
                                </a>
                            )}
                            {socialMediaData?.twitter?.url && socialMediaData?.twitter?.status === true && (
                                <a
                                    href={socialMediaData?.twitter?.url}
                                    target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                                    <Twitter size={16} />
                                </a>
                            )}
                            {socialMediaData?.youtube?.url && socialMediaData?.youtube?.status === true && (
                                <a
                                    href={socialMediaData?.youtube?.url}
                                    target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                                    <Youtube size={16} />
                                </a>
                            )}
                            {socialMediaData?.instagram?.url && socialMediaData?.instagram?.status === true && (
                                <a
                                    href={socialMediaData?.instagram?.url}
                                    target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                                    <Instagram size={16} />
                                </a>
                            )}
                            {socialMediaData?.linkedin?.url && socialMediaData?.linkedin?.status === true && (
                                <a
                                    href={socialMediaData?.linkedin?.url}
                                    target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                                    <FaLinkedin size={16} />
                                </a>
                            )}
                        </span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
                    <p>© 2025 B&G</p>
                    <p>
                        Powered by{' '}
                        <a
                            href="https://www.ftdigitalsolutions.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline"
                        >
                            {/* FT Digital Solutions (Agency). */}
                            B&G
                        </a>
                    </p>
                </div>
            </footer>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-999">
                    <div className="bg-white rounded-xl shadow-lg max-w-lg w-full mt-24 p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-semibold mb-4 text-center">Share Your Feedback</h3>

                        {submitted ? (
                            <div className="text-center text-green-600 font-medium py-6">
                                ✅ Thank you for your feedback!
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleFormChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleFormChange}
                                    placeholder="Write your testimonial..."
                                    rows={4}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                                <button type="submit" className="w-full py-3 bg-[#E1D6A8] text-white rounded-lg hover:bg-green-700 transition">Submit</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
