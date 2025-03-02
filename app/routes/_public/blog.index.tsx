import { Link, createFileRoute, notFound } from '@tanstack/react-router'

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

const fetchFrontMatters = createServerFn({ method: 'GET' }).handler(
  async () => {
    const postInfos = getPostList()

    const frontMatters = await Promise.all(
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

        setHeaders({
          'cache-control': 'public, max-age=0, must-revalidate',
          'cdn-cache-control':
            'max-age=300, stale-while-revalidate=300, durable',
          'Netlify-Vary': 'query=payload',
        })

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

    return frontMatters.sort((a, b) => {
      if (!a[1].published) {
        return 1
      }

      return (
        new Date(b[1].published || 0).getTime() -
        new Date(a[1].published || 0).getTime()
      )
    })

    // return json(frontMatters, {
    //   headers: {
    //     'Cache-Control': 'public, max-age=300, s-maxage=3600',
    //   },
    // })
  },
)

export const Route = createFileRoute('/_public/blog/')({
  staleTime: Infinity,
  loader: () => fetchFrontMatters(),
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

function BlogIndex() {
  const frontMatters = Route.useLoaderData()

  return (
    <SimpleLayout
      title="Writing on cybersecurity, software, and more."
      intro="All of my long-form thoughts on programming, leadership, cybersecurity, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {frontMatters.map(
            ([id, { title, published, excerpt, authors = [] }]) => {
              const article = {
                slug: id,
                title,
                published,
                excerpt,
                authors,
              }
              return <Article key={article.slug} article={article} />
            },
          )}
        </div>
      </div>
    </SimpleLayout>
  )
}
