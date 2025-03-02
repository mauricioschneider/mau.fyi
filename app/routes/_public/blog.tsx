import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/utils/seo'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/blog')({
  head: () => ({
    meta: seo({
      title: 'Blog | Mauricio Schneider',
      description: 'The latest news and blog posts from Mauricio Schneider!',
    }),
  }),
})

export function PostNotFound() {
  return (
    <div className="flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <h1 className="opacity-10 flex flex-col text-center font-black">
        <div className="text-7xl leading-none">404</div>
        <div className="text-3xl leading-none">Not Found</div>
      </h1>
      <div className="text-lg">Post not found.</div>
      <Link
        to="/blog"
        className={`py-2 px-4 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
      >
        Blog Home
      </Link>
    </div>
  )
}
