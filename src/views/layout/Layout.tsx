import "./layout.scss";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside.js";
import { useAppSelector } from "@/store/hook";
import Header from "./components/Headeer.js";
const Layout: React.FC = () => {
 const tokenState = useAppSelector((state) => state.token);
  // console.log(tokenState);
  return (
    <section id="container">
      <aside>
        <Aside />
      </aside>
      <section>
        <Header/>
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default Layout;
