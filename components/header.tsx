"use client"

import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "@/components/mode-toggle"
import SearchBar from "@/components/search-bar"

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Incidents Unraveled
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}