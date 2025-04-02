import { createFileRoute } from '@tanstack/react-router'
import { SimpleLayout } from '~/components/public/SimpleLayout'

export const Route = createFileRoute('/_public/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SimpleLayout title="Hello" intro="This is the about page"></SimpleLayout>
  )
}
