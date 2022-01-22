import './App.css'
import 'antd/dist/antd.css';
import Heading from "./Components/Heading";
import Page from "./Components/Page";
import {useState} from "react";
import AddWalletScreen from "./Components/AddWalletScreen";
import AboutUs from "./Components/AboutUs";
function App() {
  const [walletAddress, setWalletAddress] = useState<string>()
  return (
    <div>
      <Page>
        <AboutUs/>

        {walletAddress == null ?
          <AddWalletScreen/>
          :
          <p>Wallet address: {walletAddress}</p>
        }
      </Page>
    </div>
  )
}

export default App
