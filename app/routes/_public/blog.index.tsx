import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { getPostList, formatAuthors } from '~/utils/blog'
import { extractFrontMatter, fetchRepoFile } from '~/utils/docs.server'
import { setHeaders } from 'vinxi/http'
import { PostNotFound } from './blog'
import { Markdown } from '~/components/public/Markdown'
import { format } from 'date-fns'
import { getWebRequest } from '@tanstack/react-start/server'
import { ArticleWithSlug } from '~/components/public/ArticleLayout'
import { Card } from '~/components/public/Card'
import { SimpleLayout } from '~/components/public/SimpleLayout'

const POSTS_PER_PAGE = 5

type SearchParams = {
  page: string
}

const fetchFrontMatters = createServerFn({ method: 'GET' })
  .validator(z.object({ page: z.number() }))
  .handler(async ({ data: { page } }) => {
    const postInfos = getPostList()

    const allFrontMatters = await Promise.all(
      postInfos.map(async (info) => {
        const filePath = `app/blog/${info.id}.md`

        const file = await fetchRepoFile(
          'mauricioschneider/mau.fyi',
          'main',
          filePath,
        )

        if (!file) {
          throw notFound()
        }

        const frontMatter = extractFrontMatter(file)

        return [
          info.id,
          {
            title: frontMatter.data.title,
            published: frontMatter.data.published,
            excerpt: frontMatter.excerpt,
            authors: frontMatter.data.authors as Array<string> | undefined,
          },
        ] as const
      }),
    )

    // Filter out nulls (from files not found)
    const validFrontMatters = allFrontMatters.filter(Boolean)

    // Sort ALL posts by date first
    const sortedPosts = validFrontMatters.sort((a, b) => {
      if (!a[1].published) {
        return 1
      }

      return (
        new Date(b[1].published || 0).getTime() -
        new Date(a[1].published || 0).getTime()
      )
    })

    const totalPages = Math.ceil(postInfos.length / POSTS_PER_PAGE)
    const startIndex = (page - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE

    const paginatedPosts = sortedPosts.slice(startIndex, endIndex)

    setHeaders({
      'cache-control': 'public, max-age=0, must-revalidate',
      'cdn-cache-control': 'max-age=300, stale-while-revalidate=300, durable',
      'Netlify-Vary': 'query=payload',
    })

    return {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages,
      },
    }
  })

export const Route = createFileRoute('/_public/blog/')({
  validateSearch: z.object({
    page: z.number().int().nonnegative().catch(1),
  }),
  staleTime: Infinity,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ deps: { page } }) =>
    fetchFrontMatters({
      data: {
        page,
      },
    }),
  notFoundComponent: () => <PostNotFound />,
  component: BlogIndex,
})

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.published}
          className="md:hidden"
          decorate
        >
          {format(new Date(article.published), 'MMM dd, yyyy')}
        </Card.Eyebrow>
        <Card.Description>
          <Markdown rawContent={article.excerpt || ''} />
        </Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.published}
        className="mt-1 max-md:hidden"
      >
        {format(new Date(article.published), 'MMM dd, yyyy')}
      </Card.Eyebrow>
    </article>
  )
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {currentPage > 1 && (
        <Link
          to="/blog"
          search={{ page: currentPage - 1 }}
          className="px-4 py-2 bg-zinc-100 rounded hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Link
          key={pageNum}
          to="/blog"
          search={{ page: pageNum }}
          className={`px-4 py-2 rounded ${
            pageNum === currentPage
              ? 'bg-teal-500 text-white'
              : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          to="/blog"
          search={{ page: currentPage + 1 }}
          className="px-4 py-2 bg-zinc-100 rounded hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          Next
        </Link>
      )}
    </div>
  )
}

function BlogIndex() {
  const { posts, pagination } = Route.useLoaderData()

  return (
    <SimpleLayout
      title="Writing on cybersecurity, software, and more."
      intro="All of my long-form thoughts on programming, leadership, cybersecurity, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts.map(([id, { title, published, excerpt, authors = [] }]) => {
            const article = {
              slug: id,
              title,
              published,
              excerpt,
              authors,
            }
            return <Article key={article.slug} article={article} />
          })}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
      </div>
    </SimpleLayout>
  )
}
