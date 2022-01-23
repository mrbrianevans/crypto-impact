import './App.css'
import 'antd/dist/antd.css';
import Page from "./Components/Page";
import AddWalletScreen from "./Components/AddWalletScreen";
import AboutUs from "./Components/AboutUs";

function App() {
  return (
    <div>
      <Page>
        <AboutUs/>

        <AddWalletScreen/>

      </Page>
    </div>
  )
}

export default App
