// pages/sitemap.xml.js
export default function Sitemap() {
    return null; // Next.js won't render anything here
}

export async function getServerSideProps({ res }) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

    <url>
      <loc>https://omsritara.in/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
<loc>https://omsritara.in/wishlist</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/shop</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/blog</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/contactUs</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/aboutUs</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/blog/what-happens-to-your-body-after-reiki?</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/blog/the-benefits-of-visiting-a-free-reiki-healing-center---om-sri-tara</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/blog/rose-bracelets</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/bracelet</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/mala</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/spiritual-statues</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/rings</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/shipping-policy</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/refund-policy</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/terms-conditions</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/privacy-policy</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/cancellation-policy</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.60</priority>
</url>
<url>
<loc>https://omsritara.in/categories/earrings</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/pendants</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/pendulums</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/healing-stones</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/coins-and-cubes</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/sangu</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/angels</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/pyramid</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/crystal-bowls-and-plates</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/yanthirams-and-chakra</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://omsritara.in/categories/healing-sticks-and-towers</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<priority>0.80</priority>
</url>

  </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return { props: {} };
}
