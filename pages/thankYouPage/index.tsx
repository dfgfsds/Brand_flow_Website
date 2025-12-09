'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function ThankYouPage() {
    return (
        <>
            {/* Facebook Pixel Purchase Code */}
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '769753435410050');
              fbq('track', 'Purchase', {
                currency: "INR",
                value: 1299.00
              });
            `,
                    }}
                />
            </Head>

            {/* Fallback for No JavaScript */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=769753435410050&ev=Purchase&noscript=1"
                />
            </noscript>

            <section className=" flex items-center justify-center bg-gray-100 px-4 py-10">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center my-10">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
                    <p className="text-gray-600 mb-6">
                        Your order has been placed successfully. We’ve sent you an email with the order details.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/profile?tab=orders">
                            <button className="w-full sm:w-auto bg-blue-900 hover:bg-[#ff2121] text-white font-medium py-2 px-6 rounded transition">
                                View Orders
                            </button>
                        </Link>
                        <Link href="/shop">
                            <button className="w-full sm:w-auto border border-yellow-500 text-yellow-500 hover:bg-[#f8dfdc] font-medium py-2 px-6 rounded transition">
                                Shop More
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>

    );
}
