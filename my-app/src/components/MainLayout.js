import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineForm, AiOutlineDollar } from "react-icons/ai";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ direction: "ltr" }}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo"></span>
            <span className="lg-logo"></span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            { key: "/mainlayout/dashboard", icon: <AiOutlineDashboard className="fs-4" />, label: "لوحة التحكم" },
            {
              key: "products",
              icon: <AiOutlineForm className="fs-4" />,
              label: "المنتجات",
              children: [
                { key: "/mainlayout/addproduct", icon: <AiOutlineForm className="fs-4" />, label: "إضافة منتج" },
                { key: "/mainlayout/manageproducts", icon: <AiOutlineForm className="fs-4" />, label: "إدارة المنتجات" }
              ]
            },
            {
              key: "sell",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "بيع",
              children: [
                { key: "/mainlayout/productforsell", icon: <AiOutlineShoppingCart className="fs-4" />, label: "بيع منتج" },
                { key: "/mainlayout/managesales", icon: <AiOutlineDollar className="fs-4" />, label: "إدارة المبيعات" }
              ]
            },    
            {
              key: "customers",
              icon: <AiOutlineForm className="fs-4" />,
              label: "العملاء",
              children: [
                { key: "/mainlayout/managecustomers", icon: <AiOutlineForm className="fs-4" />, label: "إدارة العملاء" },
              ]
            },
            {
              key: "users",
              icon: <AiOutlineForm className="fs-4" />,
              label: "المستخدمين",
              children: [
                { key: "/mainlayout/manageusers", icon: <AiOutlineForm className="fs-4" />, label: "إدارة المستخدمين" }
              ]
            },
            
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{ padding: 0, background: colorBgContainer, height: "100%" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
