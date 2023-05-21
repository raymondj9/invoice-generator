import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../reusables/Footer/Footer";
import Navbar from "../reusables/Navbar/Navbar";

type LayoutProps = {
  showNav?: boolean;
  showLoader?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  useEffect(() => {
    setTimeout(() => {
      // setsLodader(false)
    }, 500);
  }, []);

  return (
    <Layout className="min-h-screen flex flex-col justify-between overflow-hidden p-4">
      <div className="">
        <Navbar />
        <div className="content">{children}</div>
      </div>
      <Footer />
    </Layout>
  );
};

const Layout = styled.div`
/* background-color: #fff; */
  & .content {
    // background: ;
    min-height: 60vh;
  }

  & .pre-loader {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 999;
    background-color: #fff;
  }

  & .pre-loader-in {
  }
`;

export default MainLayout;
