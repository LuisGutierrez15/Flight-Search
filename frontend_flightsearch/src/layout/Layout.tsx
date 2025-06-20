import type { FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] dark:bg-dark-500">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
