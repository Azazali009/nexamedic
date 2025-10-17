export default async function sitemap() {
  const baseUrl = "https://www.nexamedic.ch";

  // 🔗 Strapi API endpoints – adjust if your collection names differ
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?fields=slug`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?fields=slug`, {
      next: { revalidate: 3600 },
    }),
  ]);

  const products = (await productsRes.json())?.data || [];
  const categories = (await categoriesRes.json())?.data || [];

  const staticPages = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/about-us", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "weekly", priority: 0.7 },
    { url: "/career", changefreq: "weekly", priority: 0.7 },
    { url: "/news", changefreq: "weekly", priority: 0.8 },
    { url: "/categories", changefreq: "daily", priority: 0.9 },
    { url: "/products", changefreq: "daily", priority: 1.0 },
  ];

  const dynamicProducts = products.map((p) => ({
    url: `/products/${p.slug}`,
    changefreq: "daily",
    priority: 1.0,
  }));

  const dynamicCategories = categories.map((c) => ({
    url: `/categories/${c.slug}`,
    changefreq: "daily",
    priority: 0.9,
  }));

  const allPages = [...staticPages, ...dynamicProducts, ...dynamicCategories];

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
