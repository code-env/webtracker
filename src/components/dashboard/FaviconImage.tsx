"use client";
import React, { useState } from "react";
import Image from "next/image";



interface ClientImageProps {
    src: string;
    alt: string;
    fallbackSrc?: string;
    className?: string;
  }

  
export function FaviconImage({ src, alt, fallbackSrc = "/favicon.ico", className = "" }: ClientImageProps) {
    const [error, setError] = useState(false);
  
    return (
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        fill
        className={`object-contain ${className}`}
        onError={() => setError(true)}
      />
    );
  }