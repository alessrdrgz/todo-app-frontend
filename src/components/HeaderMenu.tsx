import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HeaderMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const MenuItems: ItemType[] = [
    {
      key: "list",
      label: t("list", { ns: "header-menu" }),
      onClick: () => navigate(`/list`),
    },
    {
      key: "historic",
      label: t("historic", { ns: "header-menu" }),
      onClick: () => navigate(`/historic`),
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={MenuItems}
      style={{ display: "inline-block", width: "auto" }}
    />
  );
}
