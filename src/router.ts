import { RouteDefinition } from "solid-navigation";

declare module "solid-navigation" {
  export interface Routers {
    Default: {
      Home: RouteDefinition;
      Onboarding: RouteDefinition;
      SignIn: RouteDefinition;
    };
  }
}
