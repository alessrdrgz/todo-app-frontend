import { Outlet } from "react-router-dom";
import { Dropdown, Layout as LY, Menu, Space } from "antd";
import HeaderMenu from "./HeaderMenu";
import { useTranslation } from "react-i18next";

const { Header, Content } = LY;

export default function Layout() {
  const { t, i18n } = useTranslation();

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: t("spanish", { ns: "languages" }),
          onClick: () => i18n.changeLanguage("es"),
        },
        {
          key: "2",
          label: t("english", { ns: "languages" }),
          onClick: () => i18n.changeLanguage("en"),
        },
      ]}
    />
  );

  return (
    <main className="App">
      <LY className="layout">
        <Header>
          <HeaderMenu />
          <Dropdown overlay={menu}>
            <a
              onClick={(e) => e.preventDefault()}
              href="blank"
              style={{ position: "absolute", right: "20px" }}
            >
              <Space>{t(i18n.language, { ns: "languages" })}</Space>
            </a>
          </Dropdown>
        </Header>
        <Content style={{ backgroundColor: "none" }}>
          <Outlet />
        </Content>
      </LY>
    </main>
  );
}
