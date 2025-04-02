import * as React from 'react'
import { Container } from '~/components/public/Container'
import { Prose } from '~/components/public/Prose'
import { format } from 'date-fns'
import { useRouter } from '@tanstack/react-router'
import { Markdown } from './Markdown'
import { marked } from 'marked'
import markedAlert from 'marked-alert'
import { gfmHeadingId, getHeadingList } from 'marked-gfm-heading-id'
import { FaEdit } from 'react-icons/fa'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface Article {
  title: string
  excerpt: string
  content?: string
  filePath?: string
  authors: string[]
  published: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

export function ArticleLayout({ article }: { article: ArticleWithSlug }) {
  const router = useRouter()

  const { markup, headings } = React.useMemo(() => {
    const markup = marked.use(
      { gfm: true },
      gfmHeadingId(),
      markedAlert(),
    )(article.content as any) as string

    const headings = getHeadingList()

    return { markup, headings }
  }, [article])

  const repo = 'mauricioschneider/mau.fyi'
  const branch = 'main'

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => router.navigate({ to: '/blog' })}
            aria-label="Go back to articles"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 shadow-md shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </button>
          <article className="prose-blogpost">
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={new Date(article.published).toISOString()}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">
                  {format(new Date(article.published), 'MMM dd, yyyy')}
                </span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              <Markdown htmlMarkup={markup}></Markdown>
            </Prose>
            <div className="py-4 opacity-70">
              <a
                href={`https://github.com/${repo}/tree/${branch}/${article.filePath}`}
                className="flex items-center gap-2 dark:text-teal-50"
              >
                <FaEdit /> Edit on GitHub
              </a>
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}
