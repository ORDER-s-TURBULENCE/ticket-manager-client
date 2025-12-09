import { createRootRoute, createRoute, createRouter} from "@tanstack/react-router"
import { Hello } from "../App"
import { UserForm } from "../pages/user/form"

export const rootRoute = createRootRoute({})

const indexRoute = createRoute({
getParentRoute: () => rootRoute,
  path: "/",
  component: Hello,
})

const userFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/form",
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
