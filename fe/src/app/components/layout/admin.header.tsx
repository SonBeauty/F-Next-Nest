'use client'
import { Layout, Menu, theme } from 'antd';

const AdminHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Content, Sider } = Layout;
  return (
    <Header style={{ padding: 0, background: colorBgContainer }} />
  )
}

export default AdminHeader