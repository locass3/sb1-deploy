import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { Mdx } from "@/components/mdx-components"
import { TableOfContents } from "@/components/table-of-contents"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params, searchParams }: { params: { slug: string }, searchParams: { page?: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const currentPage = searchParams.page || '1'

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href={`/?page=${currentPage}`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to all posts
      </Link>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-muted-foreground">{formatDate(post.date)}</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <article className="flex-grow lg:w-4/5 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <Mdx source={post.content} />
          </div>
        </article>
        <aside className="hidden lg:block lg:w-1/5 mt-8 lg:mt-0">
          <div className="sticky top-8">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}