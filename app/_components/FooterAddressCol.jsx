"use client";

import Markdown from "react-markdown";
import { useNav } from "../_context/NavProvider";
import LineSkeleton from "./LineSkeleton";

export default function FooterAddressCol() {
  const { footerData } = useNav();
  const isAddress = footerData?.footer?.address;
  const processedText = isAddress?.text?.replace(/\n/g, "  \n");
  if (!isAddress) return <LineSkeleton length={3} width="80" />;
  return (
    <div>
      <h2 className="mb-2 font-light capitalize">
        {isAddress && isAddress?.title}
      </h2>
      {isAddress && <Markdown>{processedText}</Markdown>}
    </div>
  );
}
