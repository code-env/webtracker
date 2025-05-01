import React from 'react';
import { Globe } from 'lucide-react';

export default function PlaceholderImage() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
      <div className="text-center">
        <Globe className="h-16 w-16 text-gray-300 dark:text-zinc-600 mx-auto mb-2" />
        <p className="text-xs text-gray-400 dark:text-zinc-500">No preview available</p>
      </div>
    </div>
  );
}