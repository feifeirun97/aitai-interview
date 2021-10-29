import React, { useState } from "react";
import "./App.css";
import { Avatar, Card} from 'antd';
import { Layout} from 'antd';
import { Radio } from 'antd';
import Barchart from "./Components/Barchart/Barchart";
import LineChart from "./Components/LineChart/Linechart";
import { Row, Col } from 'antd';
import Tables from "./Components/Tables/Tables";
import { Modal, Button } from 'antd';



const { Header, Content, Footer, Sider } = Layout;


function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = React.useState(1);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Avatar style={{ backgroundColor: '#3673db', marginRight: '1vw' }} />
        </Header>
        <Layout>
          <Sider  width={'15%'} theme='light' style={{height:"90vh",margin:'2vh 0 1vh 0',borderRadius:'0.5rem'}}></Sider>
          <Layout style={{ padding: '0 0 1vh 2vh'}}>
            <Card style={{ height:'6vh', margin: '2vh 0 2vh 0' , borderRadius:'0.5rem',display:'flex', alignItems:'center' }}>
              <Button danger type="primary" onClick={showModal} style={{marginLeft:'0.5rem'}}>
                点我
              </Button>
              <Modal title="信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>您好</p>
                <p>之前没有用过antd+antv+redux, 学校期中考试刚结束, 刚忙完。</p>
                <p>我对material ui比较熟练，本以为会很快完成，没想到antd的差别还是挺大的。
                  28号刚开始学的antd+antv，29号中午就要交掉，时间有些赶。
                  最后来不及调整有些细节了，抱歉。
                </p>
                <p>不管结果如何，我学到了不少。谢谢</p>
              </Modal>
            </Card>
            <Content
              style={{
                background: '#fff',
                padding: '1vh 2vh',
                borderRadius:'0.5rem',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-around'
              }}
            >
              <Row gutter={20}>
                <Col span={12} style={{width:'10px'}} ><Barchart/></Col>
                <Col span={12}> <LineChart /></Col>
              </Row>

              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>季报</Radio>
                <Radio value={2}>年报</Radio>
              </Radio.Group>
              
              <Tables />

            </Content>
          </Layout>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
