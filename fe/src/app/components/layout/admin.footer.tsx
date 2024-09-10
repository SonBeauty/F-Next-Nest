'use client'
import { Layout, Menu, theme } from 'antd';

const AdminFooter = () => {
  const { Footer } = Layout
  return (
    <Footer style={{ textAlign: 'center' }}>
      Sơn handsome ©{new Date().getFullYear()} Created by @sondeptrai
    </Footer>
  )
}

export default AdminFooter