import React, { useEffect, useState } from 'react';

import 'antd/dist/reset.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import LoginForm from './components/login';
import { useAppDispatch } from './app/hooks';
import { setUser,logOut } from './features/auth/authSlice';
import Chart from './components/Chart';
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Header } from 'antd/es/layout/layout';
const { Content, Sider } = Layout;


function App() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user')||"{}")
 
  useEffect(()=>{
  // dispatch(setUser(user));
  },[])

  return (
    <>
     {
      !user.access_token ? <Routes>
         
      <Route  path="/dashboard" element={<Dashboard />} />
      <Route path="/charts" element={user&&user.access_token&&<Chart />} />
      <Route path="/" element={<LoginForm />} />
      </Routes>:<Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
       <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={user.access_token&& user.isAdmin? [
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Home',
              onClick:()=>{user.access_token&&navigate('/Dashboard')}
              
            },
            {
              key:'2',
              icon: <VideoCameraOutlined />,
              label: 'Charts',
              onClick: ()=>{
                navigate(user.access_token&& user.isAdmin&&'/charts')}
            },
          
            {
              key: '3',
              icon: <LogoutOutlined />,
              label: 'logout',
              onClick: ()=>{dispatch(logOut());
                navigate('/')}
            },
          ]:[ {
            key: '1',
            icon: <UserOutlined />,
            label: 'Home',
            onClick:()=>{user.access_token&&navigate('/Dashboard')}
            
          },{
            key: '2',
            icon: <LogoutOutlined />,
            label: 'logout',
            onClick: ()=>{dispatch(logOut());
              navigate('/')}
          }]}
        />
      </Sider> 
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: 'colorBgContainer' }} ><h2 style={{color:'white'}}>{`welcome`}</h2></Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: 'colorBgContainer' }}>
          </div>      
          <Routes>
         
            <Route  path="/dashboard" element={<Dashboard />} />
            <Route path="/charts" element={user&&user.access_token&&<Chart />} />
            <Route path="/" element={<LoginForm />} />
            </Routes>
        </Content>
        </Layout>
    </Layout>
     }
  

    
  
    </>
  );
}

export default App;
