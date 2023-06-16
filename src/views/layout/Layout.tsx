import styles from "./layout.module.scss";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside.js";
import { useAppSelector } from "@/store/hook";
import Header from "./components/Header.js";
const Layout: React.FC = () => {
  const tokenState = useAppSelector((state) => state.token);
  // console.log(tokenState);
  return (
    <section id={styles.container}>
      <aside>
        <Aside />
      </aside>
      <section>
        <Header />
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default Layout;
