"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.guideId}`,
      label: 'Overview',
      active: pathname === `/${params.guideId}`,
    },
    {
      href: `/${params.guideId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.guideId}/billboard`,
    },
    {
      href: `/${params.guideId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.guideId}/categories`,
    },
    {
      href: `/${params.guideId}/teach`,
      label: 'Teach',
      active: pathname === `/${params.guideId}/teach`,
    },
    {
      href: `/${params.guideId}/history`,
      label: 'History',
      active: pathname === `/${params.guideId}/history`,
    },
    {
      href: `/${params.guideId}/board`,
      label: 'Community Board',
      active: pathname === `/${params.guideId}/board`,
    },
    {
      href: `/${params.guideId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.guideId}/orders`,
    },
    {
      href: `/${params.guideId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.guideId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
