import "@/styles/globals.css";
import "../styles/fonts.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ProductsProvider } from "@/context/ProductsContext";
import { VendorProvider } from "@/context/VendorContext";
import { UserProvider } from "@/context/UserContext";
import { CartItemProvider } from "@/context/CartItemContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { PolicyProvider } from "@/context/PolicyContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { WishListProvider } from "@/context/WishListContext";
import { IntentionProvider } from "@/context/IntentionsContext";
import { Toaster } from "react-hot-toast";
import 'quill/dist/quill.snow.css';
import { ReviewItemProvider } from "@/context/ReviewsUserContext";
import { ReviewProductsProvider } from "@/context/ReviewsContext";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            {/* ✅ SEO and Favicon */}
            <Head>
                <title>Brand flow </title>
                <meta
                    name="description"
                    content="Brand flow "
                />
                <link rel="icon" href="/favicon.ico" />
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                <meta
                    name="google-site-verification"
                    content="Xz1YaaLs5InPzC2s0xVI4jx05V0RE-jVCXceaqJePtg"
                />
                {/* Google Tag Manager */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-QR65DT0BZL"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QR65DT0BZL');
            `,
                    }}
                />
            </Head>

            {/* Context Providers */}
            <QueryClientProvider client={queryClient}>
                <VendorProvider>
                    <WishListProvider>
                        <ProductsProvider>
                            <UserProvider>
                                <CartItemProvider>
                                    <CategoriesProvider>
                                        <IntentionProvider>
                                            <CurrencyProvider>
                                                <PolicyProvider>
                                                    <ReviewItemProvider>
                                                        <ReviewProductsProvider>
                                                            <Layout>
                                                                <Toaster position="top-right" reverseOrder={false} />
                                                                <Component {...pageProps} />
                                                            </Layout>
                                                        </ReviewProductsProvider>
                                                    </ReviewItemProvider>
                                                </PolicyProvider>
                                            </CurrencyProvider>
                                        </IntentionProvider>
                                    </CategoriesProvider>
                                </CartItemProvider>
                            </UserProvider>
                        </ProductsProvider>
                    </WishListProvider>
                </VendorProvider>
            </QueryClientProvider>
        </>
    );
}
