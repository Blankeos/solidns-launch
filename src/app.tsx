import { Route, StackRouter } from "solid-navigation";
import "./app.css";
import Home from "./components/home";
import OnboardingPage from "./components/onboarding";

const App = () => {
  return (
    <StackRouter initialRouteName="Home">
      <Route name="Onboarding" component={OnboardingPage} />
      <Route name="Home" component={Home} />
    </StackRouter>
  );
};

export { App };
