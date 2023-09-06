import React, { Fragment, ReactNode } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "@/store/notification-context";
import { useContext } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const notificationCtx = useContext(NotificationContext);
  const { notification } = notificationCtx;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
