import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { MDXComponents } from 'mdx/types'

type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const HeadingComponent = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ children, ...props }, ref) => {
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      const id = typeof children === 'string' 
        ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '') 
        : `heading-${level}-${Math.random().toString(36).substr(2, 9)}`;
      return React.createElement(Tag, { id, ref, ...props }, children);
    }
  );
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ children, ...props }) => (
  <div className="overflow-x-auto my-8">
    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700" {...props}>
      {children}
    </table>
  </div>
);

const TableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
);

const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <tbody {...props} />
);

const TableRow: React.FC<React.TableHTMLAttributes<HTMLTableRowElement>> = (props) => (
  <tr className="border-b border-gray-300 dark:border-gray-700" {...props} />
);

const TableHeader: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = (props) => (
  <th className="px-4 py-2 text-left font-semibold" {...props} />
);

const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = (props) => (
  <td className="px-4 py-2" {...props} />
);

const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!props.src) return null;
    const { src, alt, width: propsWidth, height: propsHeight, ...rest } = props;
    const width = typeof propsWidth === 'string' ? parseInt(propsWidth, 10) : propsWidth || 500;
    const height = typeof propsHeight === 'string' ? parseInt(propsHeight, 10) : propsHeight || 300;
    return (
      <Image 
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        {...rest}
      />
    );
  },
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
}

export function Mdx({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  )
}