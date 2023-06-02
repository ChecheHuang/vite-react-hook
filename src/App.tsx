import { useRoutes } from "react-router-dom";
import AuthRouter from "@/providers/AuthRouter";
import router from "@/router";
import ToastProvider from "./providers/ToastProvider";
const Routes = () => {
  const routes = useRoutes(router);
  return routes;
};

function App() {
  return (
    <ToastProvider>
      <AuthRouter>
        <Routes />
      </AuthRouter>
    </ToastProvider>
  );
}

export default App;
