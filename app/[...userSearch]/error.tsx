"use client"; // Error components must be Client components

import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <div className="font-bold text-center">{error.message}</div>;
}
