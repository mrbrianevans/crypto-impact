import express from 'express'
import cors from 'cors'
import {findEnergyCost} from "./costCalculator";
import {getAddress} from "./costApis";


const app = express()
const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

app.get('/', (req, res)=>{
  res.status(200).send('Crypto Impact API')
})

app.get('/calculateTransactionCost',async (req, res)=>{
  const { walletAddress } = req.query // url will be like /calculateTransactionCost?walletAddress=alsdkfj
  console.log('Request with', { walletAddress })
  // work out energy cost of wallet address
  const energyCost = await findEnergyCost(await getAddress(walletAddress as string), 1);
  res.status(200).send(`${energyCost.toFixed(3)} kWh`);
})

const port = Number(process.env.PORT) || 5000
app.listen(port, () => console.log(`API web server listening on http://localhost:${port}`))