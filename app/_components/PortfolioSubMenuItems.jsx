import React from "react";
import { useNav } from "../_context/NavProvider";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioSubMenuItems({ item }) {
  const { setSelectedCategory, handleMenu } = useNav();
  return (
    <li className="group dash-hover-mini relative w-full cursor-pointer capitalize">
      <Link
        href={`/categories/${item.slug}`}
        className="block cursor-pointer duration-500 group-hover:translate-x-4"
        onClick={() => {
          handleMenu();
          setSelectedCategory(item?.slug);
        }}
      >
        {item?.name}
      </Link>
      <Image
        src={"/icons/right-arrow-white.svg"}
        width={10}
        height={10}
        alt="right"
        className="absolute top-1/2 right-0 block -translate-y-1/2 md:hidden"
      />
    </li>
  );
}
