import React from "react";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import qs from "qs";
import { getImageUrl } from "../_lib/helpers";
import Image from "next/image";
import Markdown from "react-markdown";
export default async function Page() {
  const endpoint = `/api/temporarily-unavailable?populate=*`;
  const data = await fetchDataFromApi(endpoint);
  const finalImage = getImageUrl(data?.image);

  return (
    <div className="flex flex-col items-center justify-center gap-7 p-8">
      {finalImage && (
        <Image
          src={finalImage || "/default.png"}
          alt="Temporarily Unavailable"
          width={500}
          height={500}
          className="size-[100px] sm:size-[200px]"
        />
      )}

      <div className="prose prose-a:text-blue-600 prose-img:mx-auto mx-auto my-8 max-w-3xl px-4 text-center">
        <Markdown>{data?.description}</Markdown>
      </div>
    </div>
  );
}
