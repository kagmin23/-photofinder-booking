import { Footer, HeaderNoLogin } from "../components";

type LayoutProps = {
  children: React.ReactElement | React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderNoLogin />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
};
