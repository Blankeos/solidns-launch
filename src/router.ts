import { createMemo } from "solid-js";
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

type UseRouterReturnType = ReturnType<typeof useRouter>;
let _router: UseRouterReturnType;

export function HACK_useRouter() {
  const result = createMemo(() => {
    if (!_router) return undefined;
    return _router;
  });

  return result;
}
export function HACK_setRouter(router: any) {
  _router = router;
}
