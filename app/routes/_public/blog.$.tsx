import { useState, useEffect } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { extractFrontMatter, fetchRepoFile } from '~/utils/docs.server'
import removeMarkdown from 'remove-markdown'
import { setHeaders } from 'vinxi/http'
import { seo } from '~/utils/seo'
import { z } from 'zod'
import { PostNotFound } from './blog'
import { formatAuthors } from '~/utils/blog'
import { Article, ArticleLayout } from '~/components/public/ArticleLayout'
import { format } from 'date-fns'
import { FaArrowUp } from 'react-icons/fa'

const fetchBlogPost = createServerFn({ method: 'GET' })
  .validator(z.string().optional())
  .handler(async ({ data: docsPath }) => {
    if (!docsPath) {
      throw new Error('Invalid docs path')
    }

    const filePath = `app/blog/${docsPath}.md`

    const file = await fetchRepoFile(
      'mauricioschneider/mau.fyi',
      'main',
      filePath
    )

    if (!file) {
      throw notFound()
    }

    const frontMatter = extractFrontMatter(file)
    const description = removeMarkdown(frontMatter.excerpt ?? '')

    setHeaders({
      'cache-control': 'public, max-age=0, must-revalidate',
      'cdn-cache-control': 'max-age=300, stale-while-revalidate=300, durable',
      'Netlify-Vary': 'query=payload'
    })

    return {
      title: frontMatter.data.title,
      description,
      published: frontMatter.data.published,
      content: frontMatter.content,
      authors: (frontMatter.data.authors ?? []) as Array<string>,
      filePath
    }
  })

export const Route = createFileRoute('/_public/blog/$')({
  staleTime: Infinity,
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? [
          ...seo({
            title: `${(loaderData as Article)?.title ?? 'Docs'} | TanStack Blog`,
            description: (loaderData as Article)?.excerpt
          }),
          {
            name: 'author',
            content: `${
              (loaderData as Article).authors.length > 1
                ? 'co-authored by '
                : ''
            }${formatAuthors((loaderData as Article).authors)}`
          }
        ]
        : []
    }
  },
  loader: ({ params }) => fetchBlogPost({ data: params._splat }),
  notFoundComponent: () => <PostNotFound />,
  component: BlogPost
})

function BlogPost(props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  const { title, content, filePath, authors, published } =
    Route.useLoaderData() as Article

  const article = {
    title,
    filePath,
    authors,
    published,
    content: `_by ${formatAuthors(authors)} on ${format(
      new Date(published || 0),
      'MMM dd, yyyy'
    )}._
${content}`
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition"
        >
          <FaArrowUp size={20} />
        </button>
      )}
      <ArticleLayout article={article} {...props} />
    </>
    )


}
