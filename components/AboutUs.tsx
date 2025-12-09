'use client';

const AboutUs = () => {
  return (
    <section className="py-12 px-4 md:px-12 lg:px-24 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
          About Us
        </h2>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-6">
          At <strong>Brand Flow</strong>, we believe every woman deserves to feel
          beautiful, confident, and cared for — inside and out. Founded with a passion for empowering
          women through elegance and self-care, Brand Flow brings together a curated collection of ladies’
          garments, artificial jewellery, skincare essentials, soaps, shampoos, and sanitary napkins —
          everything you need to look radiant and feel your best every day.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Our journey began in the beauty industry, and with love from our customers, we’ve grown into
          a complete lifestyle destination for women. Whether you’re searching for the perfect outfit,
          a statement piece of jewellery, or personal care products that truly care for your body —
          <strong> Brand Flow</strong> is your one-stop shop for beauty, comfort, and confidence.
        </p>

        {/* Divider */}
        <div className="mt-10 mb-10 flex justify-center">
          <div className="w-32 h-1 bg-blue-900 rounded"></div>
        </div>

        {/* Brand Section */}
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">✨ Our Brand</h3>
        <p className="text-lg leading-relaxed mb-6">
          <strong>Brand Flow</strong> stands for purity, elegance, and empowerment. We
          combine quality, affordability, and style to bring you thoughtfully selected products that
          celebrate womanhood in all its forms.
        </p>

        <ul className="list-disc pl-6 text-lg leading-relaxed mb-6 space-y-2">
          <li>
            <strong>Ladies’ Garments:</strong> From casual comfort to festive elegance — discover
            fashion that flatters and feels good.
          </li>
          <li>
            <strong>Artificial Jewellery:</strong> Trendy, classy, and crafted to shine without limits —
            perfect for every occasion.
          </li>
          <li>
            <strong>Personal Care:</strong> Our range of soaps, shampoos, and sanitary napkins is
            designed to keep you feeling fresh, confident, and protected every day.
          </li>
        </ul>

        <p className="text-lg leading-relaxed mb-10">
          Our mission is simple — to enhance your natural glow and bring luxury within reach. At
          <strong> Brand Flow</strong>, we don’t just sell products; we deliver trust, comfort, and beauty
          in every box.
        </p>

        {/* Divider */}
        <div className="mt-10 mb-10 flex justify-center">
          <div className="w-32 h-1 bg-blue-900 rounded"></div>
        </div>

        {/* Promise Section */}
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">💎 Our Promise</h3>
        <ul className="pl-6 text-lg leading-relaxed space-y-2">
          <li>✔️ Premium quality you can trust</li>
          <li>✔️ Affordable luxury for every woman</li>
          <li>✔️ Safe, skin-friendly, and comfortable products</li>
          <li>✔️ Made with care — delivered with love</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutUs;
