import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
])

export default clerkMiddleware((auth, request) => {
  if (auth().userId && isPublicRoute(request)) {
    let path = "/select-org"

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`
    }

    const orgSelection = new URL(path, request.url)
    return NextResponse.redirect(orgSelection)
  }

  if (!auth().userId && !isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
