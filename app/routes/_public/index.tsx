import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '~/components/public/Container'
import { GitHubIcon, LinkedInIcon } from '~/components/public/SocialIcons'
import { Button } from '~/components/Button'

import { fetchFrontMatters } from '~/routes/_public/blog.index'
import { Article } from '~/routes/_public/blog.index'

import logoAuth0 from '~/images/auth0.png'
import logoOkta from '~/images/okta.png'
import logoDev from '~/images/dev.png'

export const Route = createFileRoute('/_public/')({
  loader: () =>
    fetchFrontMatters({
      data: {
        page: 1
      }
    }),
  component: RouteComponent
})

function SocialLink({
                      icon: Icon,
                      ...props
                    }: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon
        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

interface Role {
  company: string
  title: string
  logo: any
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div
        className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center ring-1 shadow-md shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <img src={role.logo} alt="" className="h-7 w-7" />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>
          {' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Okta',
      title: 'Principal Security Analyst',
      logo: logoOkta,
      start: '2020',
      end: '2024'
    },
    {
      company: 'Auth0',
      title: 'Sr. Manager, Dev Support',
      logo: logoAuth0,
      start: '2020',
      end: '2020'
    },
    {
      company: 'Auth0',
      title: 'Escalation Manager',
      logo: logoAuth0,
      start: '2019',
      end: '2020'
    },
    {
      company: 'Auth0',
      title: 'Regional Manager, Dev Support',
      logo: logoAuth0,
      start: '2017',
      end: '2019'
    },
    {
      company: 'Auth0',
      title: 'Developer Support Engineer',
      logo: logoAuth0,
      start: '2016',
      end: '2017'
    },
    {
      company: 'Various',
      title: 'Software Engineer',
      logo: logoDev,
      start: '2012',
      end: '2016'
    }
  ]


  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon
          className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function RouteComponent() {
  // TODO: refactor userLoaderData to live outside the route file
  const { posts } = Route.useLoaderData()
  const latest = posts[0]
  const article = {
    slug: latest[0],
    title: latest[1].title,
    published: latest[1].published,
    excerpt: latest[1].excerpt,
    authors: latest[1].authors ? latest[1].authors : ['']
  }
  return (
    <>
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
              to="https://github.com/mauricioschneider/"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              to="https://www.linkedin.com/in/mauriciorschneider/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-8">
          Latest Blog Post
        </h2>
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <Article key={article.slug} article={article} />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
