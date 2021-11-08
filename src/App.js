import React, { useState } from "react";
import "./App.css";
import { Avatar} from 'antd';
import { Layout} from 'antd';

import Model from "./Components/Model/metrics/Index";


const { Header, Content, Footer, Sider } = Layout;


function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = React.useState(1);
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const onChange = e => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Avatar style={{ backgroundColor: '#3673db', marginRight: '1vw' }} />
        </Header>
        <Layout>
          <Sider  width={'10%'} theme='light' style={{height:"90vh",margin:'2vh 0 1vh 0',borderRadius:'0.5rem'}}></Sider>
          <Layout className='content'>

            <Content
              style={{
                background: '#fff',
                padding: '1vh 2vh',
                borderRadius:'0.5rem',
                display:'flex',
                flexDirection:'column',
                // justifyContent:'space-around'
              }}
            >
              {/* <Row gutter={20}>
                <Col span={12} style={{width:'10px'}} ><Barchart/></Col>
                <Col span={12}> <LineChart /></Col>
              </Row>

              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>季报</Radio>
                <Radio value={2}>年报</Radio>
              </Radio.Group>
              
              <Tables /> */}
              <Model />
            </Content>
          </Layout>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
