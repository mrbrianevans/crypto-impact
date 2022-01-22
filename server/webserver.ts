import express from 'express'
import {findEnergyCost} from "./costCalculator";
import {getAddress} from "./costApis";


const app = express()


app.get('/', (req, res)=>{
  res.status(200).send('Crypto Impact API')
})

app.get('/calculateTransactionCost',async (req, res)=>{
  const { walletAddress } = req.query // url will be like /calculateTransactionCost?walletAddress=alsdkfj
  // work out energy cost of wallet address
  const energyCost = await findEnergyCost(await getAddress(walletAddress as string), 1);
  res.status(200).json(energyCost);
})

app.listen(5000, ()=>console.log('API web server listening on http://localhost:5000'))