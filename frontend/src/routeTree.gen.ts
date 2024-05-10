/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PastesNewImport } from './routes/pastes/new'
import { Route as PastesIdImport } from './routes/pastes/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PastesNewRoute = PastesNewImport.update({
  path: '/pastes/new',
  getParentRoute: () => rootRoute,
} as any)

const PastesIdRoute = PastesIdImport.update({
  path: '/pastes/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pastes/$id': {
      preLoaderRoute: typeof PastesIdImport
      parentRoute: typeof rootRoute
    }
    '/pastes/new': {
      preLoaderRoute: typeof PastesNewImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  PastesIdRoute,
  PastesNewRoute,
])

/* prettier-ignore-end */