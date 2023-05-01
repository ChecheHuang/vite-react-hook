import "./layout.scss";
import { Outlet } from "react-router-dom";
import Aside from "./Aside.jsx";
import { useAppSelector } from "@/store/hook";
const Layout: React.FC = () => {
 const tokenState = useAppSelector((state) => state.token);
  // console.log(tokenState);
  return (
    <section id="container">
      <aside>
        <Aside />
      </aside>
      <section>
        <header>header</header>
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default Layout;
