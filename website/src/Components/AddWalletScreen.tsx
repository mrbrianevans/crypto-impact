import React, {useState} from 'react';
import styles from './AddWalletScreen.module.css'
import {Button, Card, Divider, Empty, Input, Space} from 'antd';
import Title from "antd/es/typography/Title";

const {Search} = Input;
type AddWalletScreenProps = {}
const AddWalletScreen: React.FC<AddWalletScreenProps> = (props) => {
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function callApi(walletAddress: string) {
    setLoading(true)
    const res = await fetch('http://localhost:5000/calculateTransactionCost?' + new URLSearchParams({walletAddress}))
      .then(r => r.text())
      .finally(() => setLoading(false))

    console.log('API response', res)
    setApiResponse(res)
  }

  return (
    <div className={styles.content}>
      <Title level={3}>Please put your wallet address below</Title>

      <Search size="large" prefix={'#'} placeholder={'Wallet address'} loading={loading} onSearch={callApi}
              allowClear enterButton={'Get impact'} showCount minLength={26}/>
      <Divider/>
      {apiResponse && <Space direction={'vertical'}>
          <Space direction={'horizontal'} align={'center'}>
              <Card title={'Impact'} style={{width: 300}}>
        <pre>
            {JSON.stringify(apiResponse, null, 2)}
        </pre>
              </Card>
              <Card title={'Impact'} style={{width: 300}}>
        <pre>
            {JSON.stringify(apiResponse, null, 2)}
        </pre>
              </Card>
              <Card title={'Impact'} style={{width: 300}}>
        <pre>
            {JSON.stringify(apiResponse, null, 2)}
        </pre>
              </Card>

          </Space>
          <Card title={'Impact'}>
        <pre>
      {JSON.stringify(apiResponse, null, 2)}
        </pre>
          </Card>

          <Button danger onClick={()=>setApiResponse(null)}>Clear</Button>
      </Space>
      }


      {!apiResponse && <Empty />}
    </div>
  );
};

export default AddWalletScreen;