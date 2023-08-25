import React, { Fragment, ReactNode } from "react";
import MainHeader from "./main-header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
