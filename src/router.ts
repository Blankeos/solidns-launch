import { RouteDefinition, createStackRouter } from "solid-navigation";

declare module "solid-navigation" {
  export interface Routers {
    Default: {
      Home: RouteDefinition;
      Onboarding: RouteDefinition;
      SignIn: RouteDefinition;
      Pricing: RouteDefinition;
      Discover: RouteDefinition;
      Profile: RouteDefinition;
      More: RouteDefinition;
    };
  }
}

export const { Route, useRoute, StackRouter, useParams, useRouter } =
  createStackRouter<"Default">();

let _router: ReturnType<typeof useRouter>;
export function HACK_getRouter() {
  return _router;
}
export function HACK_setRouter(router: any) {
  _router = router;
}
