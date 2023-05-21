import { BrowserRouter, Route, Switch } from "react-router-dom";
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
