import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Previous
        </Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Next
        </Link>
      )}
    </div>
  )
}