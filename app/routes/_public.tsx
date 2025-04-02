import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { Layout } from '~/components/public/Layout'
import publicCss from '~/styles/tailwind.css?url'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/_public')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Mauricio Schneider | Jack of All Trades',
        description: `Personal website with cool stuff in it`,
        image: `https://mau.fyi/logo512.png`,
        keywords: 'mauricio schneider',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: publicCss },
      {
        rel: 'icon',
        href: '/favicon.png',
        type: 'image/x-icon',
        sizes: '16x16',
      },
    ],
    scripts: [
      {
        src: 'https://tinylytics.app/embed/UEjamr5CMzAxZExyvn7X.js',
        defer: true
      }
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}
