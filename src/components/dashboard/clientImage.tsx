"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Globe } from "lucide-react";

interface ClientImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

// Regular image with error handling
export function ClientImage({ src, alt, className = "" }: ClientImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
        <Globe className="h-16 w-16 text-gray-300 dark:text-zinc-600" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}