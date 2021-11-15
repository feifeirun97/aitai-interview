import React, { useState } from "react";
import "./App.css";
import { Avatar} from 'antd';
import { Layout} from 'antd';

import Model from "./Components/Model/metrics/Index";

import Test from "./Components/Model/units/TestUint"
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
          <Sider  width={'10%'} theme='light' style={{height:"90vh",margin:'2vh 0 1vh 0',borderRadius:'0.5rem'}}></Sider>
          <Layout style={{padding: '2vh 5vh 1vh 10vh'}}>

            <Content
              style={{
                background: '#fff',
                padding: '1vh 2vh',
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
