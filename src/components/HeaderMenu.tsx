import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useNavigate } from "react-router-dom";

export default function HeaderMenu() {
  const navigate = useNavigate();

  const MenuItems: ItemType[] = [
    {
      key: "list",
      label: "Lista",
      onClick: () => navigate(`/list`),
    },
    {
      key: "historic",
      label: "Histórico",
      onClick: () => navigate(`/historic`),
    },
  ];

  return <Menu theme="dark" mode="horizontal" items={MenuItems} />;
}
