import { HACK_setRouter, Route, StackRouter, useRouter } from "@/router";
import { registerUniversalLinkCallback } from "@nativescript-community/universal-links";
import "./app.css";
import { BottomNavigation } from "./components/navigation/bottom-navigation";
import { useAuthContext } from "./features/auth/auth.context";
import Discover from "./pages/discover";
import Home from "./pages/home";
import More from "./pages/more";
import OnboardingPage from "./pages/onboarding";
import PricingPage from "./pages/pricing";
import Profile from "./pages/profile";
import { SignInPage } from "./pages/signin";
import { parseDeepLink } from "./utils/get-deep-link";

const App = () => {
  const { user } = useAuthContext;

  return (
    <>
      <gridlayout rows="*, auto">
        <StackRouter initialRouteName="Home">
          <Providers />
          <Route name="Onboarding" component={OnboardingPage} />
          <Route name="Home" component={Home} />
          <Route name="SignIn" component={SignInPage} />
          <Route name="Pricing" component={PricingPage} />
          <Route name="Discover" component={Discover} />
          <Route name="Profile" component={Profile} />
          <Route name="More" component={More} />
        </StackRouter>

        <BottomNavigation />
      </gridlayout>
    </>
  );
};

export { App };

function Providers() {
  const router = useRouter();
  HACK_setRouter(router);

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
