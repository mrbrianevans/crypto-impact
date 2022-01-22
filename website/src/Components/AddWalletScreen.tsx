import React, {useState} from 'react';
import styles from './AddWalletScreen.module.css'
import {Button, Card, Input} from 'antd';
type AddWalletScreenProps = {

}

const AddWalletScreen: React.FC<AddWalletScreenProps> = (props) => {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [apiResponse, setApiResponse] = useState<any>(null)
  async function callApi(){
    const res = await fetch('http://localhost:5000/calculateTransactionCost?'+new URLSearchParams({walletAddress})).then(r=>r.text())
    console.log('API response',res)
    setApiResponse(res)
  }

  return (
    <div>
      <p>Please put your wallet address below</p>
      <Input value={walletAddress} onInput={e => setWalletAddress(e.currentTarget.value)}/>
      <Button type="primary" onClick={callApi}>Submit</Button>

      {apiResponse &&
      <Card title={'API response'}>
        <pre>
            {JSON.stringify(apiResponse, null, 2)}
        </pre>
      </Card>
      }
    </div>
  );
};

export default AddWalletScreen;