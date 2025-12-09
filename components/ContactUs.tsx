'use client';

import { Phone } from 'lucide-react';

const ContactUs = () => {
    return (
        <section>
            <div className="container mx-auto px-4 py-12" />
            <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Left: Contact Info (33%) */}
                    <div className="space-y-10">
                        {/* Customer Service */}

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                ABOUT
                            </h3>
                            <div className="text-sm text-gray-700 leading-relaxed">
                                Welcome to <strong>Brand Flow</strong> — where quality, craftsmanship, and elegance come together to create products that
                                elevate your everyday living.
                                <br /><br />
                                Founded by <strong>Brand Flow</strong>, <strong>Brand Flow</strong> stands as a symbol of trust and excellence, offering a
                                curated range of products designed to blend style, durability, and functionality.
                                <br /><br />
                                At <strong>Brand Flow</strong>, we believe in thoughtful design and attention to detail. Each item reflects our commitment
                                to delivering exceptional quality that adds a touch of sophistication to your lifestyle.
                                <br /><br />
                                Discover the <strong>Brand Flow</strong> experience — where tradition meets innovation, and every creation tells a story
                                of passion, dedication, and perfection.
                            </div>

                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                CUSTOMER SERVICE
                            </h3>
                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                <Phone className="text-indigo-600 mt-1" />
                                <div>
                                    <p className="text-gray-400">+91 7094256929</p>
                                    {/* <p>Monday to Saturday</p> */}
                                    {/* <p>10 am – 6:30 pm (Chennai)</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Store Location */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                STORE LOCATOR
                            </h3>
                            <p className="text-sm text-gray-700">
                                Brand Flow <br />
                                No1, Nethahi Main Road,<br />
                                Bibikulam, Madurai,<br />
                                Tamil Nadu 625002
                            </p>
                        </div>
                    </div>

                    {/* Right: Map (66%) */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                        {/* 
              Wrap the iframe in a relative container that maintains a 16:9
              ratio on small screens and a 4:3 ratio on md+ for a bit more height.
            */}
                        <div className="relative w-full overflow-hidden
                            aspect-video md:aspect-[4/3]">
                            <iframe
                                className="absolute inset-0 h-full w-full rounded-lg"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.900541730677!2d78.1289989!3d9.942232899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5f14ba34651%3A0x83ca0582afaa4bfe!2sBlush%20%26%20Glow%20BB%20Kulam%20madurai%20%7C%20Best%20Beauty%20Parlour%20%26%20Training%20%7C%20Bridal%20Makeup%20%7C%20Beautician%20%7C%20Skin%20care%20%7C%20Tattoo%20Specialist!5e0!3m2!1sen!2sin!4v1762329525012!5m2!1sen!2sin"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;


{/* <iframe 
     width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}