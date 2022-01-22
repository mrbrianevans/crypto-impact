import React, {useState} from 'react';
import styles from './AddWalletScreen.module.css'
import {Badge, Button, Card, Col, Divider, Empty, Input, List, Pagination, Row, Space, Statistic, Timeline} from 'antd';
import Title from "antd/es/typography/Title";
import {ImpactResponse} from "../../../common/types/ImpactResponse";

const {Search} = Input;
type AddWalletScreenProps = {}
const AddWalletScreen: React.FC<AddWalletScreenProps> = (props) => {
  const [apiResponse, setApiResponse] = useState<ImpactResponse | null>(null)
  const [loading, setLoading] = useState(false)

  async function callApi(walletAddress: string) {
    setLoading(true)
    const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : ''
    const res = await fetch(baseUrl + '/calculateTransactionCost?' + new URLSearchParams({walletAddress}))
      .then(r => r.json())
      .finally(() => setLoading(false))

    console.log('API response', res)
    setApiResponse(res)
  }

  const [currentTransaction, setCurrentTransaction] = useState(1)
  return (
    <div className={styles.content}>
      <Title level={3}>Paste your wallet address below to get started</Title>

      <Search size="large" prefix={'#'} placeholder={'Wallet address'} loading={loading} onSearch={callApi}
              allowClear enterButton={'Get impact'} showCount minLength={26}/>
      <Divider/>
      {apiResponse && <>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} justify="center">
              <Col span={2}>

              </Col>
              <Col span={8}>
                  <Card title={'Total energy consumption'}>
                      <Statistic title={'Kilowatt Hours (kWh)'} value={apiResponse.totalCostKwh}/>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card title={'Recent energy consumption'}>
                      <Statistic title={'Kilowatt Hours (kWh) in last 7 days'} value={apiResponse.totalCostKwh / 2.8}/>
                  </Card>
              </Col>
              <Col span={2}>
                  <Button danger onClick={() => setApiResponse(null)}>Clear</Button>
              </Col>
          </Row>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} style={{marginTop: 16}}>
              <Col span={24}>
                  <Card title={'Cost breakdown - transactions'}>
                      <Timeline mode={'left'}>
                        {apiResponse.costBreakDown.slice((currentTransaction - 1) * 10, currentTransaction * 10).map(item => (
                          <Timeline.Item label={item.transaction.txid}>{item.relativeImpactKwh} KWh</Timeline.Item>))}
                      </Timeline>
                      <Divider>
                          <Pagination total={apiResponse.costBreakDown.length - 1} pageSize={10}
                                      current={currentTransaction} onChange={setCurrentTransaction}/>
                      </Divider>
                  </Card>
              </Col>
          </Row>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} style={{marginTop: 16}}>
              <Col span={24}>
                  <Card title={'Full API Response'}>
            <pre>
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
                  </Card>
              </Col>
          </Row>


      </>
      }


      {!apiResponse && <Empty />}
    </div>
  );
};

export default AddWalletScreen;