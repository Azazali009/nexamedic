import CategoryProductListing from "@/app/_components/CategoryProductListing";
import { fetchDataFromApi } from "@/app/_utils/strapiFetcher";
import React from "react";

// dynamic meta data
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Fetch both categories and partners
  const [categories, partners] = await Promise.all([
    fetchDataFromApi(`/api/categories`),
    fetchDataFromApi(`/api/partners`),
  ]);

  // Find matching category or partner by slug
  const category = categories?.find((cat) => cat.slug === slug);
  const partner = partners?.find((p) => p.slug === slug);

  // Determine which one matched
  let metaTitle = "";
  let metaDescription = "";

  if (category) {
    metaTitle = category?.metaTitle || category?.name;
    metaDescription = category?.metaDescription || "";
  } else if (partner) {
    metaTitle = partner?.metaTitle || partner?.name;
    metaDescription = partner?.metaDescription || "";
  } else {
    metaTitle = "Page Not Found";
    metaDescription = "This page does not exist or has been removed.";
  }

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

// generate static params
export async function generateStaticParams() {
  const categories = await fetchDataFromApi("/api/categories");

  const categorySlugs = categories?.map((category) => ({
    category: String(category?.slug),
  }));

  return categorySlugs;
}

export default async function Page({ params }) {
  const { slug } = await params;

  const products = await fetchDataFromApi(
    "/api/products?populate=*&pagination[limit]=100&sort=order:asc",
  );

  return (
    <div className="mx-auto min-h-screen w-[85%]">
      <CategoryProductListing products={products} slug={slug} />
    </div>
  );
}
