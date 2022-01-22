import React, {useState} from 'react';
import styles from './AddWalletScreen.module.css'
import {Badge, Button, Card, Divider, Empty, Input, List, Pagination, Space, Statistic, Timeline} from 'antd';
import Title from "antd/es/typography/Title";
import {ImpactResponse} from "../../../common/types/ImpactResponse";

const {Search} = Input;
type AddWalletScreenProps = {}
const AddWalletScreen: React.FC<AddWalletScreenProps> = (props) => {
  const [apiResponse, setApiResponse] = useState<ImpactResponse | null>(null)
  const [loading, setLoading] = useState(false)

  async function callApi(walletAddress: string) {
    setLoading(true)
    const res = await fetch('http://localhost:5000/calculateTransactionCost?' + new URLSearchParams({walletAddress}))
      .then(r => r.json())
      .finally(() => setLoading(false))

    console.log('API response', res)
    setApiResponse(res)
  }

  return (
    <div className={styles.content}>
      <Title level={3}>Paste your wallet address below to get started</Title>

      <Search size="large" prefix={'#'} placeholder={'Wallet address'} loading={loading} onSearch={callApi}
              allowClear enterButton={'Get impact'} showCount minLength={26}/>
      <Divider/>
      {apiResponse && <Space direction={'vertical'}>
          <Space direction={'horizontal'} align={'center'}>
              <Card title={'Impact'} style={{width: 300}}>
                  <Statistic title={'Energy consumption (KWh)'} value={apiResponse.totalCostKwh}/>
              </Card>
              <Card title={'Impact'} style={{width: 300}}>
                  <Statistic title={'Total transactions'} value={apiResponse.totalCostTxs}/>
              </Card>
          </Space>

          <Card title={'Cost breakdown - transactions'}>
              <Timeline mode={'left'}>
                {apiResponse.costBreakDown.map(item => (
                  <Timeline.Item label={item.transaction.txid}>{item.relativeImpactKwh} KWh</Timeline.Item>))}
              </Timeline>
              <Pagination defaultCurrent={1}/>
          </Card>


          <Card title={'Full API Response'}>
            <pre>
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </Card>

          <Button danger onClick={() => setApiResponse(null)}>Clear</Button>
      </Space>
      }


      {!apiResponse && <Empty />}
    </div>
  );
};

export default AddWalletScreen;