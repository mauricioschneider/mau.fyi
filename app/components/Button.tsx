import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import * as React from 'react'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
  )

export function Button({
                         variant = 'primary',
                         className,
                         href,
                         ...rest
                       }: ButtonProps) {
  const computedClassName = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  if (href) {
    // Render <Link> when `href` is defined
    const linkProps = rest as React.ComponentPropsWithoutRef<typeof Link>
    return <Link className={computedClassName} to={href} {...linkProps} />
  } else {
    // Render <button> for everything else
    const buttonProps = rest as React.ComponentPropsWithoutRef<'button'>
    return <button className={computedClassName} {...buttonProps} />
  }

}

