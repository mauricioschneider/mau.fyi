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
          Technologist, jack of all trades, and hoarder of domain names.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I'm Mauricio Schneider, a technology professional from Chile now based
          in the Pacific Northwest. Throughout my decade in information security
          and software, I've focused on bridging the gap between technical
          complexity and human needs, helping organizations scale without losing
          their authenticity.
        </p>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          My expertise spans cybersecurity, technical support, and software
          development. As a problem solver at heart, I believe effective
          solutions come from understanding both technical systems and the
          people who use them. I lead with compassion and by example,
          translating complex challenges into practical outcomes.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://github.com/mauricioschneider/"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
          />
          <SocialLink
            href="https://www.linkedin.com/in/mauriciorschneider/"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
          />
        </div>
      </div>
    </Container>
  )
}
