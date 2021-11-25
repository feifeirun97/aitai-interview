import React, { useState } from "react";
import "./App.css";
import { Avatar} from 'antd';
import { Layout} from 'antd';

import Model from "./Components/Model/metrics/Index";

import Test from "./Components/Model/units/TestUint"
import SideMenu from "./Components/Model/components/sideMenu";
// import Chart from "./Components/Model/components/CombChart"

const { Header, Content, Footer, Sider } = Layout;


function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = React.useState(1);

  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Avatar style={{ backgroundColor: '#3673db', marginRight: '1vw' }} />
        </Header>
        <Layout>
          <Sider  width={'10vw'} theme='light' style={{height:"94vh",margin:'1vh 1vw 1vh 0',borderRadius:'0.5rem'}}></Sider>
          <Layout style={{height:"94vh"}}>

            <Content
              style={{
                width:'88vw',
                borderRadius:'0.5rem',
                display:'flex',
                flexDirection:'column',
              }}
            >
            <Model/>
            {/* <Test /> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>

    </div>

    
  );
}

export default App;
