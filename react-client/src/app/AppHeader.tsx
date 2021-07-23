import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link, useLocation } from "react-router-dom";

const headerConfig = [
  {
    key: "",
    displayName: "Home",
    link: "/",
  },
  {
    key: "certificate",
    displayName: "Certificates",
    link: "/certificate",
  },
]

const menusRender = headerConfig.map((header) => (
  <Menu.Item key={header.key}>
    <Link to={header.link}>{header.displayName}</Link>
  </Menu.Item>
));

const AppHeader = () => {
  const location = useLocation();
  const currentPath = location?.pathname?.split("/")[1] || "";

  return (
    <Header>
      <Menu
        id="header-menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentPath]}
      >
        {menusRender}
      </Menu>
    </Header>
  );
};

export default AppHeader;