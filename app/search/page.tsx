import { getAllPosts } from '@/lib/mdx'
import BlogPostCard from '@/components/blog-post-card'
import Link from 'next/link'

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const searchQuery = searchParams.q || ''
  const allPosts = await getAllPosts()

  const searchResults = allPosts.filter((post) => {
    const searchContent = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase()
    return searchContent.includes(searchQuery.toLowerCase())
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{searchQuery}&quot;</h1>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((post) => (
            <BlogPostCard key={post.slug} post={post} currentPage={1} />
          ))}
        </div>
      ) : (
        <p>No results found for &quot;{searchQuery}&quot;</p>
      )}
      <Link href="/" className="mt-8 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  )
}