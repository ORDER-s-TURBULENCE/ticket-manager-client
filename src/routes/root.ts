import { createRootRoute, createRoute, createRouter} from "@tanstack/react-router"
import { UserForm } from "../pages/user/form"
import { Index } from "../pages"

export const rootRoute = createRootRoute({})

const indexRoute = createRoute({
getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
})

const userFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/form/$movie_id/$type",
  component: UserForm,
})

const routeTree = rootRoute.addChildren([indexRoute, userFormRoute]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router
  }
}
