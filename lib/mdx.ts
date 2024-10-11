import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as { title: string; date: string; excerpt: string }),
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as { title: string; date: string; excerpt: string }),
  }
}

export async function getPaginatedPosts(page: number, limit: number) {
  const allPosts = await getAllPosts()
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedPosts = allPosts.slice(startIndex, endIndex)

  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages: Math.ceil(allPosts.length / limit),
  }
}