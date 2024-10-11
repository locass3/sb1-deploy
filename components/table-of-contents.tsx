"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getHeadings = useCallback(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }));
    setHeadings(elements);
    return elements;
  }, []);

  useEffect(() => {
    const elements = getHeadings();

    const callback = (entries: IntersectionObserverEntry[]) => {
      headingElementsRef.current = entries.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      if (!clickedId) {
        const visibleHeadings: IntersectionObserverEntry[] = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
        });

        const getIndexFromId = (id: string) =>
          elements.findIndex((heading) => heading.id === id);

        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
          );
          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px'
    });

    elements.forEach((element) => {
      const el = document.getElementById(element.id);
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [getHeadings, clickedId]);

  const getIndentClass = (level: number) => {
    switch (level) {
      case 2:
        return "pl-0";
      case 3:
        return "pl-4";
      case 4:
        return "pl-8";
      case 5:
        return "pl-12";
      case 6:
        return "pl-16";
      default:
        return "pl-0";
    }
  };

  const handleClick = (id: string) => {
    setClickedId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickedId(null);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc">
      <ul className="space-y-2">
        <li className="text-lg font-semibold mb-2">On this page</li>
        {headings.map((heading) => (
          <li
            key={`${heading.id}-${heading.text}`}
            className={cn(
              "text-sm transition-all duration-300 ease-in-out",
              getIndentClass(heading.level),
              (clickedId === heading.id || (!clickedId && activeId === heading.id))
                ? "text-blue-500 font-medium translate-x-2"
                : "text-gray-600 hover:text-blue-500 hover:translate-x-1"
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}