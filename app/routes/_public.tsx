import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { Layout } from '~/components/public/Layout'
import publicCss from '~/styles/tailwind.css?url'

export const Route = createFileRoute('/_public')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: publicCss }],
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
