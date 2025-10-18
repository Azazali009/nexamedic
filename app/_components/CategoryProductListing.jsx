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

  // ✅ initialize default filter once if empty
  useEffect(() => {
    // ✅ run only once on mount
    setFilterSelectedValues((prev) => {
      // agar already user ke filters hain, unhe preserve karo
      if (prev && prev.length > 0) return prev;

      // agar empty hai, tabhi slug se default set karo
      return slug ? [slug] : [];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 👈 dependency array empty rakho!

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
