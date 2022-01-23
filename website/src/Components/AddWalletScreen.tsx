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
// Source: https://www.iea.org/reports/global-energy-co2-status-report-2019/emissions
const GLOBAL_KGCO2_PER_KWH = 0.475;
// Source: https://www.carbonindependent.org/sources_aviation.html
const FLIGHT_KGCO2_PER_HOUR = 90;

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
      <Paragraph copyable={{text: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v'}}>Sample address:
        1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v</Paragraph>
      <Search size="large" prefix={'#'} placeholder={'Wallet address'} loading={loading} onSearch={callApi}
              allowClear enterButton={'Get impact'} showCount minLength={26}/>
      <Divider/>
      {apiResponse && apiResponse.costBreakDown && <>
          <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]} justify="center">
              <Col span={4}>
              </Col>
              <Col span={8}>
                  <Card title={'Total energy consumption'}>
                      <Statistic title={'Kilowatt Hours (kWh)'}
                                 value={apiResponse && (apiResponse.totalCostKwh).toFixed(2)}/>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card title={'Equivalent energy consumption'}>
                      <Statistic title={'Days of powering an average UK household'} loading={!apiResponse}
                        value={apiResponse&&(apiResponse.totalCostKwh/AVG_DAILY_HOUSEHOLD_CONS_KWH).toFixed(2)}/>
                    <Statistic title={'Kilograms of CO2 emissions'} loading={!apiResponse}
                               value={apiResponse&&(apiResponse.totalCostKwh*GLOBAL_KGCO2_PER_KWH).toFixed(2)}/>
                    <Statistic title={'Hours of flight (On a 737-400)'} loading={!apiResponse}
                               value={apiResponse&&(apiResponse.totalCostKwh*GLOBAL_KGCO2_PER_KWH
                                   /FLIGHT_KGCO2_PER_HOUR).toFixed(2)}/>
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
                    {apiResponse && apiResponse.uncountedTxs && (currentTransaction*10 > apiResponse.costBreakDown.length) ? (
                        <div style={{
                          display: "flex",
                          justifyContent: "center"
                        }}>+ {apiResponse.uncountedTxs} other transactions</div>
                    ):null}
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