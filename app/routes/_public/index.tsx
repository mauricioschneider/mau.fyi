import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '~/components/public/Container'
import { GitHubIcon, LinkedInIcon } from '~/components/public/SocialIcons'

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
})

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function RouteComponent() {
  return (
    <Container className="mt-9">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Software designer, founder, and amateur astronaut.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I’m Spencer, a software designer and entrepreneur based in New York
          City. I’m the founder and CEO of Planetaria, where we develop
          technologies that empower regular people to explore space on their own
          terms.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="#"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
          />
          <SocialLink
            href="#"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
          />
        </div>
      </div>
    </Container>
  )
}
