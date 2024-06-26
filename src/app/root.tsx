import '@/app/globals.css'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import { createElement } from 'react'
import ErrorBoundaryBlock from '@/components/blocks/error-boundary'
import { getEnvValue } from '@/lib/utils'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

const isClient = typeof document !== 'undefined'

export function ErrorBoundary() {
  const error = useRouteError()

  if (isClient) {
    return createElement('html', {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: document.getElementsByTagName('html')[0].innerHTML,
      },
    })
  }

  if (isRouteErrorResponse(error)) {
    const pageTitle = `Oops! ${error.statusText} - ${getEnvValue('VITE_APP_NAME')}`
    return (
      <html lang="en">
        <head>
          <title>{pageTitle}</title>
          <Meta />
          <Links />
        </head>
        <body>
          <ErrorBoundaryBlock
            data={error.data}
            status={error.status}
            statusText={error.statusText}
          />
          <Scripts />
        </body>
      </html>
    )
  }
}

export function HydrateFallback() {
  return <h1>Loading</h1>
}
