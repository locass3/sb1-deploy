import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogPostCard({ post, currentPage }: { post: Post; currentPage: number }) {
  return (
    <Link href={`/blog/${post.slug}?page=${currentPage}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{post.excerpt}</CardDescription>
          <p className="text-sm text-muted-foreground mt-2">
            {formatDate(post.date)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}