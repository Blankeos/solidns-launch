import { Route, StackRouter } from "solid-navigation";
import "./app.css";
import { useAuthContext } from "./features/auth/auth.context";
import Home from "./pages/home";
import OnboardingPage from "./pages/onboarding";
import { SignInPage } from "./pages/signin";

const App = () => {
  const { user } = useAuthContext;

  return (
    <StackRouter initialRouteName="Home">
      <Route name="Onboarding" component={OnboardingPage} />
      <Route name="Home" component={Home} />
      <Route name="SignIn" component={SignInPage} />
    </StackRouter>
  );
};

export { App };
