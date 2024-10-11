"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { formatDate } from '@/lib/utils';

export function BlogTitleBar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const title = isHomePage ? "Welcome to Incidents Unraveled" : "Blog Post Title";
  const date = isHomePage ? "" : new Date().toISOString();

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {date && <p className="text-lg opacity-80">{formatDate(date)}</p>}
      </div>
    </div>
  );
}