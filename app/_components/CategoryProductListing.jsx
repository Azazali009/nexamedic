"use client";
import React, { useEffect, useState } from "react";
import CategoryFilterSidebar from "./CategoryFilterSidebar";
import ProductGrid from "./ProductGrid";
import ToggleFilter from "./ToggleFilter";
import { useFilter } from "../_context/FilterProvider";

export default function CategoryProductListing({ products, slug }) {
  const [showFilter, setShowFlter] = useState(false);
  const { filterSelectedValues, setFilterSelectedValues } = useFilter();

  //  If no filter, show all
  const selectedFilters =
    filterSelectedValues.length > 0 ? filterSelectedValues : [];

  const filteredProducts = products.filter((product) => {
    if (selectedFilters.length === 0) return true;

    const partnerSlugs = product.partners?.map((p) => p.slug) || [];
    const categorySlugs = product.categories?.map((c) => c.slug) || [];

    return selectedFilters.some(
      (selected) =>
        partnerSlugs.includes(selected) || categorySlugs.includes(selected),
    );
  });

  useEffect(() => {
    setFilterSelectedValues(slug ? [slug] : []);
  }, [slug]);

  return (
    <div className="mt-20">
      <h1
        className={`text-3xl capitalize ${filterSelectedValues?.length >= 3 ? "sm:text-3xl" : "sm:text-6xl"} md:ml-[276px]`}
      >
        {filterSelectedValues?.length > 0
          ? filterSelectedValues?.join(" / ")
          : "Products"}
      </h1>
      <div className="my-10 mb-48 grid grid-cols-1 items-start gap-4 sm:my-20 md:grid-cols-[250px_1fr]">
        <ToggleFilter setShowFlter={setShowFlter} />
        <CategoryFilterSidebar showFilter={showFilter} />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
