import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
