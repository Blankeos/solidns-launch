import { registerUniversalLinkCallback } from "@nativescript-community/universal-links";
import { Route, StackRouter, useRouter } from "solid-navigation";
import "./app.css";
import { useAuthContext } from "./features/auth/auth.context";
import Home from "./pages/home";
import OnboardingPage from "./pages/onboarding";
import PricingPage from "./pages/pricing";
import { SignInPage } from "./pages/signin";
import { parseDeepLink } from "./utils/get-deep-link";

const App = () => {
  const { user } = useAuthContext;

  return (
    <StackRouter initialRouteName="Home">
      <Providers />
      <Route name="Onboarding" component={OnboardingPage} />
      <Route name="Home" component={Home} />
      <Route name="SignIn" component={SignInPage} />
      <Route name="Pricing" component={PricingPage} />
    </StackRouter>
  );
};

export { App };

function Providers() {
  const router = useRouter();

  registerUniversalLinkCallback((ul) => {
    try {
      const pathname = parseDeepLink(ul);
      router.navigate(pathname);
    } catch (err) {
      console.error("Navigate Failed", err);
    }
  });

  return <></>;
}
