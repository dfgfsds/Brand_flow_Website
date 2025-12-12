'use client';
import React from 'react';

const AboutSection: React.FC = () => {

    return (
        <section className=" pt-5 pb-10 m-4">
            <div className="max-w-7xl mx-auto container bg-gray-200 p-4 rounded-md">
                <div className="font-bold text-lg text-center py-2">Our Brand Story</div>
                <div className="font-bold text-3xl text-center py-2 text-blue-900">B&amp;G</div>
                <div className="text-md text-gray-700 px-1 leading-relaxed">
                    <strong>B&amp;G</strong> was founded by <span className="font-semibold">TKS Babu</span> with a passion for redefining
                    beauty and grooming standards. What began as a small initiative to provide reliable saloon products has grown into a
                    trusted brand loved by professionals and beauty enthusiasts alike.
                    <br /><br />
                    Built on a foundation of <span className="font-semibold">quality, trust, and customer care</span>, B&amp;G aims to
                    make premium beauty and saloon essentials accessible to everyone. Each product reflects our commitment to excellence
                    and our understanding of what customers truly need — effective, safe, and result-driven products that enhance
                    confidence and style.
                    <br /><br />
                    Under the dedicated leadership of <span className="font-semibold">TKS Babu</span>, B&amp;G continues to evolve as a
                    brand that blends tradition with innovation. We take pride in helping our customers look and feel their best while
                    upholding our promise of integrity and satisfaction in everything we do.
                </div>
            </div>


            {/* <div className="w-full max-w-3xl mx-auto my-8 px-4">
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        src="https://www.youtube.com/embed/Fx3LtSscbXY?si=Td4wmlIPUbT_4yDn"
                        title="Omsritara Introduction Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </div> */}
        </section>
    );
};

export default AboutSection;
