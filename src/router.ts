import { createStackRouter, type RouteDefinition } from "solid-navigation"

declare module "solid-navigation" {
  export interface Routers {
    Default: {
      Home: RouteDefinition
      Onboarding: RouteDefinition
      SignIn: RouteDefinition
      Pricing: RouteDefinition
      Discover: RouteDefinition
      Profile: RouteDefinition
      More: RouteDefinition
    }
  }
}

export const {
  Route,
  /** Only use this for getting 'current route' */
  useRoute,
  /** Only use this for navigations. 'Current Route' is always stale here. */
  useRouter,
  StackRouter,
  StackRouterFrame,
  useParams,
} = createStackRouter<"Default">()
