import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as LY } from "antd";
import HeaderMenu from "./HeaderMenu";

const { Header, Content } = LY;

export default function Layout() {
  return (
    <main className="App">
      <LY className="layout">
        <Header>
          <div className="logo" />
          <HeaderMenu />
        </Header>
        <Content style={{ backgroundColor: "none" }}>
          <Outlet />
        </Content>
      </LY>
    </main>
  );
}
