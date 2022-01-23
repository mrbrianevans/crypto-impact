import React, {useState} from 'react';
import styles from './AddWalletScreen.module.css'
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Empty,
  Input,
  Pagination,
  Row,
  Space,
  Statistic,
  Timeline,
  Typography
} from 'antd';
import Title from "antd/es/typography/Title";
import {ImpactResponse} from "../../../common/types/ImpactResponse";

const AVG_DAILY_HOUSEHOLD_CONS_KWH = 8;

const {Search} = Input;
const {Paragraph} = Typography
type AddWalletScreenProps = {}
const AddWalletScreen: React.FC<AddWalletScreenProps> = (props) => {
  const [apiResponse, setApiResponse] = useState<ImpactResponse | null>(null)
  const [loading, setLoading] = useState(false)

  async function callApi(walletAddress: string) {
    walletAddress = walletAddress.trim()
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
      <Paragraph copyable={{text: 'bc1q9jl08lx23dwfv33wr8qvv5kcfcw8f9dmzcry65'}}>Sample address:
        bc1q9jl08lx23dwfv33wr8qvv5kcfcw8f9dmzcry65</Paragraph>
      <Search size="large" prefix={'#'} placeholder={'Wallet address'} loading={loading} onSearch={callApi}
              allowClear enterButton={'Get impact'} showCount minLength={26}/>
      <Divider/>
      {apiResponse && apiResponse.costBreakDown && <>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} justify="center">
              <Col span={4}>
              </Col>
              <Col span={8}>
                  <Card title={'Total energy consumption'}>
                      <Statistic title={'Kilowatt Hours (kWh)'} value={apiResponse&&(apiResponse.totalCostKwh).toFixed(2)}/>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card title={'Equivalent energy consumption'}>
                      <Statistic title={'Days of powering an average UK household'} loading={!apiResponse}
                        value={apiResponse&&(apiResponse.totalCostKwh/AVG_DAILY_HOUSEHOLD_CONS_KWH).toFixed(2)}/>
                  </Card>
              </Col>
              <Col span={4}>
                  <Space direction={'vertical'}>
                      <Button danger onClick={() => setApiResponse(null)}>Clear</Button>
                      <Card title={'Sustainable alternative'} size={'small'}>
                          <Typography.Link href="https://solarcoin.org/" target={"_blank"}>SolarCoin</Typography.Link>
                      </Card>
                  </Space>
              </Col>
          </Row>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} style={{marginTop: 16}}>
              <Col span={24}>
                  <Card title={'Cost breakdown - transactions'}>
                      <Timeline mode={'left'}>
                        {apiResponse.costBreakDown.slice((currentTransaction - 1) * 10, currentTransaction * 10).map(item => (
                          <Timeline.Item label={item.transaction.txid}>{item.relativeImpactKwh} KWh</Timeline.Item>))}
                      </Timeline>
                    {(currentTransaction*10 > apiResponse.costBreakDown.length) && (
                        <div style={{
                          display: "flex",
                          justifyContent: "center"
                        }}>+ x other transactions</div>
                    )}
                      <Divider>
                          <Pagination total={apiResponse.costBreakDown.length - 1} pageSize={10}
                                      current={currentTransaction} onChange={setCurrentTransaction}/>
                      </Divider>
                  </Card>
              </Col>
          </Row>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} style={{marginTop: 16}}>
              <Col span={24}>
                  <Collapse>
                      <Collapse.Panel key={1} header={'Full API Response'}>
                        <pre>
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      </Collapse.Panel>
                  </Collapse>
              </Col>
          </Row>


      </>
      }


      {!apiResponse && <Empty style={{minHeight: 250}}/>}
    </div>
  );
};

export default AddWalletScreen;