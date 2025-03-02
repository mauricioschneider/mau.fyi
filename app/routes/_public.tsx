import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { Layout } from '~/components/public/Layout'
import publicCss from '~/styles/tailwind.css?url'
import favicon from '/favicon.png?url'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/_public')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Mauricio Schneider | Jack of All Trades',
        description: `Personal website with cool stuff in it`,
        //image: `https://tanstack.com${ogImage}`,
        keywords: 'mauricio schneider',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: publicCss },
      {
        rel: 'icon',
        href: favicon,
        type: 'image/x-icon',
        sizes: '16x16',
      },
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
