import {  useRoutes } from "react-router-dom";
import AuthRouter from "@/components/AuthRouter";
import router from "@/router";
const Routes = () => {
  const routes = useRoutes(router);
  return routes;
};

function App() {
  return (
    <AuthRouter>
      <Routes />
    </AuthRouter>
  );
}

export default App;
