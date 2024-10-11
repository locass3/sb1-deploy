import { getPaginatedPosts } from '@/lib/mdx'
import BlogPostCard from '@/components/blog-post-card'
import Pagination from '@/components/pagination'

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const page = parseInt(searchParams.page || '1', 10)
  const limit = 6 // Show 6 posts per page
  const { posts, currentPage, totalPages } = await getPaginatedPosts(page, limit)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} currentPage={currentPage} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}