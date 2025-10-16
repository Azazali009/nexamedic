import React from "react";

export default function Empty({ name = "data" }) {
  return (
    <div className="text-primary flex items-center justify-center p-4">
      <p>
        Coming <strong className="capitalize">Soon!</strong>
      </p>
    </div>
  );
}
