// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             "www.reikicrystalproducts.com",
//             "ecomapi.ftdigitalsolutions.org",
//             "cdn.shopify.com",
//             "semantic-ui.com",
//             "cdn-icons-png.flaticon.com",
//         ],
//     },
//     async rewrites() {
//         return [
//             {
//                 source: "/robots.txt",
//                 destination: "/api/robots",
//             },
//             {
//                 source: "/sitemap.xml",
//                 destination: "/api/sitemap",
//             },
//         ];
//     },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "ecomapi.ftdigitalsolutions.org",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "www.reikicrystalproducts.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cdn.shopify.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "semantic-ui.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cdn-icons-png.flaticon.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "**",    
    //   }
    // ],
  },

  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/api/robots" },
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];
  },
};

module.exports = nextConfig;
