import { HashRouter, useRoutes } from "react-router-dom";
import AuthRouter from "@/components/AuthRouter";
import router from "@/router";
const Routes = () => {
  const routes = useRoutes(router);
  return routes;
};

function App() {
  return (
    <HashRouter>
      <AuthRouter>
        <Routes />
      </AuthRouter>
    </HashRouter>
  );
}

export default App;
